import React, {useState, useContext, useEffect} from 'react'
import classes from './Listing.module.css';
import { CarouselProvider, CarouselContext, Slider, Slide, ButtonBack, ButtonNext, DotGroup, WithStore } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { subscribe } from 'graphql';

const MiniListingCarrousel = (props) => {
    let currentSlideReducer = props.currentSlide
    const carouselContext = useContext(CarouselContext)
    const setCurrentSlide =  (value) => {
        carouselContext.setStoreState({
            currentSlide:value
        })
     }
    return(
        <div className={classes.carrousel_image__mini}>
                   <CarouselProvider
                   naturalSlideWidth={100}
                   naturalSlideHeight={100}
                   totalSlides={props.images.length}
                   infinite
                   currentSlide={currentSlideReducer}
                   dragEnabled={false}
                   visibleSlides={10}
                   >      
               <Slider classNameAnimation={classes.slider_animation} className={classes.slider_mini}>
                {props.images.map(({src}, index) =>(
                    <div>
                     <Slide index={index} onClick={() => setCurrentSlide(index)} innerClassName={classes.inns} className={classes.listing_image__mini} index={src}> <img src={"http://rinx.tplinkdns.com:3002/static/" + src } alt="Lisitng"/> </Slide>          
                    </div>
                ))}
                </Slider>
       </CarouselProvider>
        </div>
     
    )
}


export default MiniListingCarrousel


  
