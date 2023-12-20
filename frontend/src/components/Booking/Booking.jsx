import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { toast } from "react-hot-toast";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("data"));
  const user = userData && userData.username;

  const [booking, setBooking] = useState({
    userId: userData && userData._id,
    userEmail: userData && userData.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: "",
    bookAt: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Check for empty values
    if (value.trim() === "") {
      // Handle empty value, e.g., show an error message
      console.log(`Field ${id} cannot be empty`);
      // You may also set an error state or display a message to the user
    } else {
      setBooking((prev) => ({ ...prev, [id]: value }));
    }
  };

  const serviceFee = 1500;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if any required field is empty
    const requiredFields = ["fullName", "phone", "guestSize", "bookAt"];
    const isEmptyField = requiredFields.some(
      (field) => !booking[field] || booking[field].trim() === ""
    );

    if (!userData) {
      toast.error("Please login ");
      return;
    }

    if (isEmptyField) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      if (!user) {
        return toast.error("Please log in first");
      }

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
      }

      navigate("/gateway");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-s-fill"></i>{" "}
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ============= booking form ============= */}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form " onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>
      {/* ============= booking end ============= */}

      {/* ============= booking bottom ============= */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ₹{price} <i className="ri-close-line"></i> 1 person (incl. all
              Tax)
            </h5>
            <span>₹{price}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> ₹{totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button
          className=" btn primary__btn w-100 mt-4 bookNow_button"
          onClick={handleClick}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
