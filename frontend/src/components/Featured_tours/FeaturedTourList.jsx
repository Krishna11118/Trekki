import React, { useEffect, useRef, useState, useContext } from 'react'
import TourCard from '../../shared/TourCard'
import { Col } from 'reactstrap'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import LoadingGif from '../../assets/images/loadingGif3.gif'
import "./featured_tour.css"



const FeaturedTourList = () => {
 const { data: featuredTours, error } = useFetch(
    `${BASE_URL}/tours/search/getFeaturedTours`);

    const [loading, setLoading] = useState(true);

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
        {loading && <div className='loading_gif'><img src={LoadingGif} alt="loading_gif" /></div>}
        {!loading && error && <h4 className='text-center pt-5'> {error}</h4>}
        {!loading && !error && featuredTours?.map(tour => (
          <Col lg='3' md="4" sm="6" className='mb-4' key={tour.id}>
            <TourCard tour={tour} />
          </Col>
        ))}
      </>
    )
    
}

export default FeaturedTourList