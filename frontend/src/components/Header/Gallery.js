import React from "react"
import {Container,Row,Col} from 'reactstrap'

import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery';
import './Gallery.css'


const Gallery = () => {

  
return(
<>
    <section>


            <Container>
              <Row>
                <Col lg='12'>
                <h2 className="gallery__title">Our tour gallery</h2>
                </Col>

                <Col lg='12'>
                  <MasonryImagesGallery/>
                </Col>
              </Row>
            </Container>
           </section>
</>
)}

export default Gallery