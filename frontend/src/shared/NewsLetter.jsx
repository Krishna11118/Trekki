import React, { useState } from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";
import Subscribe from "../assets/images/subscribe.png";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    toast.success("Subscribed!");
    setEmail("");
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Add with us</h2>
              <div className="newsletter__input">
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="btn newsletter__btn "
                  onClick={handleSubscribe}
                >
                  Subcribe
                </button>
              </div>
              <p>
                Welcome! We're excited to have you consider subscribing to our
                website. By joining our community, you'll receive exclusive
                benefits and stay up-to-date on all our latest news, products,
                and services. Sign up now to start enjoying these perks!
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={Subscribe} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
