import tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const tourId = req.params.tourId;


  try {  
    const newReview = new Review({ ...req.body });

    const savedReview = await newReview.save();
   
      

    // after creating a new review now update the reviews array of the tour

    await tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview.id },
    });

    
    res
      .status(200)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: "failed to submit " });
  }
};
