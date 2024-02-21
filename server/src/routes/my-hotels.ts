import { body } from "express-validator";
import Hotel, { HotelType } from "./../models/hotel";
import cloudinary from "cloudinary";
import express, { Request, Response } from "express";
import multer from "multer";
import verifyToken from "../middleware/auth";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 50 * 1024 * 1024, //5MB
  },
});
// api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("country is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      // 1. Upload the images to cloudbinary
      // const uploadPromise = imageFiles.map(async (image) => {
      //   const b64 = Buffer.from(image.buffer).toString("base64");
      //   let dataURI = "data:" + image.mimetype + ":base64," + b64; // Fix missing comma here
      //   const cloudinaryRes = await cloudinary.v2.uploader.upload(dataURI);
      //   return cloudinaryRes.url; // Use a different variable name
      // });

      const uploadPromise = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        const uniqueIdentifier =
          Date.now() + "-" + Math.random().toString(36).substring(2, 8);
        let dataURI = "data:" + image.mimetype + ";base64," + b64;

        try {
          const cloudinaryRes = await cloudinary.v2.uploader.upload(dataURI, {
            public_id: "hotel_images/" + uniqueIdentifier, // Set a unique identifier as the public_id
          });
          return cloudinaryRes.url;
        } catch (uploadError) {
          console.error("Error uploading image to Cloudinary:", uploadError);
          throw uploadError; // Rethrow the error
        }
      });

      // 2. Create hotel
      const imageUrls = await Promise.all(uploadPromise);
      console.log(imageUrls);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      console.log(newHotel);

      // 3. Save hotel in our database
      const hotel = new Hotel(newHotel);
      console.log(hotel);
      await hotel.save();

      // 4. Return a 201 status
      res.status(200).send(hotel);
    } catch (error) {
      console.log("Error creating Hotels:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels" });
  }
});
export default router;
