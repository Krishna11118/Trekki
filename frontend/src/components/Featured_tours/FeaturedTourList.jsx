import React, { useEffect, useState } from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import LoadingGif from "../../assets/images/loadingGif3.gif";
import "./featured_tour.css";
import { toast } from "react-hot-toast";

const FeaturedTourList = () => {
  const { data: featuredTours, error, loading } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`
  );

  const [toastId, setToastId] = useState(null);

  useEffect(() => {
    // Display toast when error changes and toast is not already displayed
    if (error && !toastId) {
      const newToastId = toast.error(error);
      setToastId(newToastId);
    }

    // Cleanup the toastId when component unmounts
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [error, toastId]);

  return (
    <>
      {loading ? (
        <div className="loading_gif">
          <img src={LoadingGif} alt="loading_gif" />
        </div>
      ) : (
        featuredTours?.map((tour) => (
          <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
            <TourCard tour={tour} />

          </Col>
        ))
      )}
    </>
  );
};

export default FeaturedTourList;
