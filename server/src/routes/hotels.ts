import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../../shared/types";
const router = express.Router();

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
      ? queryParams.map((star: string) => parseInt(star))
      : parseInt(queryParams.stats);
    constructSearchQuery.startRating = { $eq: starRating };
  }

  if (queryParams.maxPrice) {
    constructSearchQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }
  return constructSearchQuery;
};
export default router;
