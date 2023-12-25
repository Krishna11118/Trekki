import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
// import logo from '../../assets/images/logoGif2.gif'

const quick__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick__links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container className="footer-media">
        <Row>
          <Col lg="3">
            <p>
              The company itself is a very successful company. And who,
              therefore, should be, even of those who are present.
            </p>

            <div className="social__links footer__quick-links   gap-4">
              <span>
                <a href="https://www.linkedin.com/in/krishna365">
                  <i className="ri-linkedin-box-line"></i>
                </a>
              </span>

              <span>
                <a href="https://github.com/Krishna11118">
                  <i className="ri-github-line"></i>
                </a>
              </span>

              <span>
                <a href="https://www.instagram.com">
                  <i className="ri-instagram-line"></i>
                </a>
              </span>

              <span>
                <a href="https://www.facebook.com">
                  <i className="ri-facebook-box-line"></i>
                </a>
              </span>
            </div>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>

            <ListGroup className="footer__quick-links">
              {quick__links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <a href={item.path}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>

            <ListGroup className="footer__quick-links">
              {quick__links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <a href={item.path}>{item.display}</a>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>

            <ListGroup className="footer__quick-links">
              <ListGroupItem className="ps-0 border-0 gap-3">
                <h6 className="mb-0  gap-2">
                  <span>
                    <i className="ri-map-pin-line mx-2"></i>
                  </span>
                  Address:
                </h6>
                <p className="mb-0">Delhi,India</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0  gap-3">
                <h6 className="mb-0  gap-2">
                  <span>
                    <i className="ri-mail-unread-line mx-2"></i>
                  </span>
                  Email:
                </h6>
                <p className="mb-0">Trekki@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0  gap-3">
                <h6 className="mb-0 gap-2">
                  <span>
                    <i className="ri-phone-fill mx-2"></i>
                  </span>
                  Phone:
                </h6>
                <p className="mb-0">+911111111111</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">Copyright {year}, All right reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
