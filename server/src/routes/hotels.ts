import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { BookingType, HotelSearchResponse } from "../../shared/types";
import { param, validationResult } from "express-validator";
import Stripe from "stripe";
import verifyToken from "../middleware/auth";
import { run } from "node:test";
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
    }
    const pageSize = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page?.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);
    const total = await Hotel.countDocuments(query);

    const reponse: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };
    return res.status(200).json(reponse);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findOne({ _id: id });

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
      }

      res.status(200).json(hotel);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);
router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    return res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  async (req: Request, res: Response) => {
    //1.TotalCost
    //2.HotelId
    //3.userId
    try {
      const { numberOfNights } = req.body;
      const hotelId = req.params.hotelId;
      const hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        res.status(400).json({ message: "Hotel not found" });
      }
      const totalCost = (hotel?.pricePerNight || 0) * (numberOfNights || 1);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost,
        currency: "gbp",
        metadata: {
          hotelId,
          userId: req.userId,
        },
      });
      if (!paymentIntent.client_secret) {
        res.status(500).json({ message: "Error creating payment intent" });
      }
      const response = {
        paymentIntent: paymentIntent.id,
        clientSecret: paymentIntent.client_secret?.toString(),
        totalCost,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.post(
  "/:hotelId/bookings",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      // Uncomment this block if you're going to use the Stripe paymentIntent logic
      // const paymentIntentId = req.body.paymentIntentId;
      // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId as string);
      // if (!paymentIntent) {
      //   return res.status(400).json({ message: "payment intent not found" });
      // }
      // if (
      //   paymentIntent.metadata.hotelId !== req.params.hotelId ||
      //   paymentIntent.metadata.userId !== req.userId
      // ) {
      //   return res.status(400).json({ message: "payment intent is mismatch" });
      // }
      // if (paymentIntent.status !== "succeeded") {
      //   return res.status(400).json({
      //     message: `payment intent not succeeded. Status: ${paymentIntent.status} `,
      //   });
      // }

      const newBookingData: BookingType = {
        ...req.body,
        userId: req.userId,
      };
      const hotel = await Hotel.findOne({ _id: req.params.hotelId });

      if (!hotel) {
        return res.status(400).json({ message: "Hotel not found" });
      }

      hotel.bookings.push(newBookingData);
      await hotel.save();

      console.log(hotel.bookings);
      res.status(200).json();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

const constructSearchQuery = (queryParams: any) => {
  let constructSearchQuery: any = {};
  if (queryParams.destination) {
    constructSearchQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }
  if (queryParams.adultCount) {
    constructSearchQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }
  if (queryParams.childCount) {
    constructSearchQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }
  if (queryParams.facilities) {
    constructSearchQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }
  if (queryParams.types) {
    constructSearchQuery.type = {
      $in: Array.isArray(queryParams.types)
        ? queryParams.types
        : [queryParams.types],
    };
  }
  if (queryParams.stars) {
    const starRating = Array.isArray(queryParams.stars)
      ? queryParams.stars.map((star: string) => parseInt(star))
      : parseInt(queryParams.stars);
    constructSearchQuery.startRating = { $in: starRating };
  }

  if (queryParams.maxPrice) {
    constructSearchQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  return constructSearchQuery;
};
export default router;
