import React, { useState } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";



const Booking = ({ tour, avgRating }) => {
    const { price, reviews , title } = tour;
    const navigate = useNavigate();
  
    //   ================= Definining user data ===============
    const userData = JSON.parse(localStorage.getItem("data"));
    const user = userData && userData.username;
    // ========================================================
  
    const [booking, setBooking] = useState({
      userId: userData && userData._id,
      userEmail: userData && userData.email,
      tourName : title, 
      fullName: "",
      phone: "",
      guestSize: 2,  
      bookAt: "",
    });
  
    const handleChange = (e) => {
      setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const serviceFee = 1500;
    const totalAmount =
      Number(price) * Number(booking.guestSize) + Number(serviceFee);
  
    //   send data to the server
    const handleClick = async (e) => {
      e.preventDefault();
  
  
      try {
        if (!user) {
          return alert("Please log in first");
        }
  
        const res = await fetch(`${BASE_URL}/booking`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(booking),
        });
  
        const result = await res.json();
  
        if (!res.ok) {
          alert(result.message);
        }
  
        navigate("/gateway");
      } catch (error) {
        alert(error.message);
      }
    };
  
    // Check if user is logged in before proceeding with booking process  =====*********###### OPTIONAL

    // if (!user) {
    //   return <div>Please log in to book this tour</div>;
    // }
    // 
  
  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
        ₹{price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating} (
          {reviews?.length})
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
              ₹{price} <i className="ri-close-line"></i> 1 person (incl. all Tax)
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
        <Button  className=" btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
