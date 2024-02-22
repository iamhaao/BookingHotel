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
      //1. Upload the images to cloudbinary
      const imageUrls = await uploadImages(imageFiles);
      //2.Create neew Hotel
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

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

router.get("/:hotelId", verifyToken, async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId.toString();
  try {
    const hotel = await Hotel.findOne({ _id: hotelId, userId: req.userId });
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messsage: "Error Fetching Hotels" });
  }
});
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    const hotelId = req.params.hotelId.toString();
    try {
      const updateHotel: HotelType = req.body;
      updateHotel.lastUpdated = new Date();
      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: hotelId,
          userId: req.userId,
        },
        updateHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(401).json({ message: "Hotel not found" });
      }
      const files = req.files as Express.Multer.File[];
      const updateImageUrls = await uploadImages(files);
      hotel.imageUrls = [...updateImageUrls, ...(updateHotel.imageUrls || [])];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Something went Wrong" });
    }
  }
);
async function uploadImages(imageFiles: Express.Multer.File[]) {
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

  const imageUrls = await Promise.all(uploadPromise);
  return imageUrls;
}
export default router;
