import React from 'react'
import  Masonry, {ResponsiveMasonry } from 'react-responsive-masonry'
import galleryImages from './galleryImages'

const MasonryImagesGallery = () => {
  return (
   <ResponsiveMasonry columnsCountBreakPoints={{350:1,786:3,992:4}}>
    <Masonry gutter='1rem'>
      {
        galleryImages.map((item,index)=>(
             <img className='masonry__img' src={item} key={index} alt='' style={{'widht':'100%','display':'block','borderRadius':'10px'}}/>
        ))
      }
    </Masonry>

   </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery