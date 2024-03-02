import verifyToken from "../middleware/auth";
import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelType } from "../../shared/types";
const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const result = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter((booking) => {
        booking.userId === req.userId;
      });
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unablie to fetch bookings" });
  }
});

export default router;
