import React from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import NewsLetter from "../shared/NewsLetter";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import LoadingGif from "../assets/images/loadingGif3.gif";
import { toast } from "react-hot-toast";


import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState();
  const [toastId, setToastId] = useState(null);


  const {
    data: tours,
    error,
    loading
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8); //later we will use backend data
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPageCount(pages);
  }, [page, tourCount, tours]);


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
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading &&  <div className='loading_gif'><img src={LoadingGif} alt="loading_gif" /></div>}
          {/* {error && <h4 className="text-center pt-5">{toast.error(error)}</h4>} */}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="3" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default Tours;
