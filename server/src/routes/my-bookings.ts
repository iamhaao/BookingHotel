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
      console.log(hotel.bookings);
      const userBookings = hotel.bookings.filter((booking) => {
        return booking.userId === req.userId;
      });
      console.log(userBookings);
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
