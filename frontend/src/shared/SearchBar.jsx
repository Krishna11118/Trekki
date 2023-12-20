import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return toast.error("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) {
      toast.error("Something went wrong");
      return;
    }
    const result = await res.json();
    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
      { state: result.data }
    );
  };

  return (
    <Col lg="12" className="searhbar_body">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 TextField form__group form_group-fast">
            <span>
              <i className="ri-map-pin-user-fill"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          {/* //////////////////////////////////////////////////////////////////////////// */}
          <FormGroup className="d-flex gap-3 TextField form__group form_group-fast">
            <span>
              <i className="ri-map-pin-time-fill"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance K/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>
          {/* ///////////////////////////////////////////////////////////////////////////////////////// */}
          <FormGroup className="d-flex gap-3 TextField form__group form_group-last">
            <span className="filterIcons">
              <i className="ri-group-fill  "></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          {/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-eye-fill"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
