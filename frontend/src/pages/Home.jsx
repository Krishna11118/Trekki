import React, { useState } from "react";
import heroImg from "../assets/images/heroself.jpg";
import { Container, Row, Col } from "reactstrap";
import experienceImg from "../assets/images/experience1.png";
import SearchBar from "./../shared/SearchBar";
import FeaturedTourList from "../components/Featured_tours/FeaturedTourList";
import Testimonials from "../components/Testimonial/Testimonials";
import Heart from "../assets/images/heart.png";
import Like from "../assets/images/like.png";
import Fire from "../assets/images/fire.png";
import "../styles/home.css";

const Home = () => {

  var [dur, setdu] = useState(0);

  const handlemove = () => {
    dur = dur + 1;
    setdu(dur);
  };
  var [kri, setkri] = useState(0);

  const handleLike = () => {
    kri = kri + 1;
    setkri(kri);
  };
  
  var [kri2, setkri2] = useState(0);

  const handleFire = () => {
    kri2 = kri2 + 1;
    setkri2(kri2);
  };

  return (
    <>
      {/* hero start section */}
      <section className="background">
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content ">
                <div className="hero__subtitle d-flex align-items-center"></div>
                <h1>
                  The gladdest moment in human life, me thinks,{" "}
                  <span className="highlight">
                    {" "}
                    is a departure into unknown lands memories
                  </span>
                </h1>
              
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__image-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>

          
            <SearchBar />
          </Row>
        </Container>
      </section>
    

      {/* //////////////////////////////////feature tour section start/////////////////////// */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <h2 className="featured__tour-title">Suggested Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>
      {/* //////////////////////////////////feature tour section end/////////////////////// */}

      {/* //////////////////////////////////Experience section start/////////////////////// */}

      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">

                <h2>
                  We guarantee you the best experience,
                  <br /> leave your backpack on us
                </h2>
                <h1 >
                  Our Fun Section
                  <br />
                </h1>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5 ">
                <div  onClick={handleLike} className="counter__box disable-selection">
                  <img src={Like} alt="like-img" />
                  <h6>You have {kri} Likes</h6>
                </div>

                <div onClick={handlemove} className="counter__box disable-selection">
                  <img src={Heart} alt="heart-img" />
                  <h6>You have {dur} Hearts</h6>
                </div>

                <div onClick={handleFire} className="counter__box disable-selection">
                  <img src={Fire} alt="fire-img" />
                  <h6>You have {kri2} Fire</h6>
                </div>
              </div>

             
            </Col>

            <Col lg="6">
              <div className="experience__img">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>


     

      {/* /////////////////////////////////////testomonial section start////////////////////// */}

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h2 className="testimonial__title featured__tour-title">Our Feedbacks </h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>


    </>
  );
};

export default Home;
