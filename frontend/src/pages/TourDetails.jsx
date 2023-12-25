import React, { useEffect, useRef, useState, useContext } from "react";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "./../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import NewsLetter from "../shared/NewsLetter";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import LoadingGif from "../assets/images/loadingGif3.gif";
import { toast } from "react-hot-toast";
import "../styles/tour-details.css";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  //fetching data from the server
  const { data: tour, error } = useFetch(`${BASE_URL}/tours/${id}`);

  //desctructing properties from tour object
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  const [text, setText] = useState({ text: "" });

  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("data"));

    // Check if userData is defined and not null
    if (!userData) {
      toast.error("Please login ");
      return;
    }

    if (!tourRating) {
      toast.error("Please select rating");
      return;
    }
    try {
      const reviewObj = {
        username: userData?.username,
        reviewText: text.text,
        rating: tourRating,
      };
      console.log(reviewObj,"reviewObj")

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      });

      toast.success("Review added successfully");
    } catch (error) {
      console.log("1")

      toast.error(error.message);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tour]);

  const [loading, setLoading] = useState(true);

  // *************************Loading GIF***********************************
  useEffect(() => {
    // Set a timeout function to hide the loading GIF after 3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Clean up the timeout on unmount or re-render to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <section>
        <Container>
          {loading && (
            <div className="loading_gif">
              <img src={LoadingGif} alt="loading_gif" />
            </div>
          )}
          {loading && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color" }}
                        ></i>{" "}
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({reviews?.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i className=""></i>₹{price} / per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i>
                        {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i>
                        {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/*============== tour reviews section =============== */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          {" "}
                          1<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4<i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5<i className="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          // ref={reviewMsgRef}
                          name="text"
                          value={text.text}
                          placeholder="share your thoughts"
                          required
                          onChange={(e) => setText({ text: e.target.value })}
                        />
                        <button
                          className="btn primary__btn text-white submit_button"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item" key={review._id}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString("en-US", options)}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating}
                                <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*============== tour reviews section end =============== */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default TourDetails;
