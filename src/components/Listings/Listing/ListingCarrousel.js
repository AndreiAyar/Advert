import React, {useState, useContext, useEffect} from 'react'
import classes from './Listing.module.css';
import { CarouselProvider, CarouselContext, Slider, Slide, ButtonBack, ButtonNext, DotGroup, ButtonFirst, WithStore } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { subscribe } from 'graphql';
import MiniListingCarrousel from './MiniListingCarrousel'

const ListingCarrousel = (props) => {
    const carouselContext = useContext(CarouselContext)
    console.log(props)
    const setCurrentSlide =  (value) => {// de scos, e doar pentru testing
        carouselContext.setStoreState({
            currentSlide:value
        })
     }
    return(
        <React.Fragment>
               <Slider classNameAnimation={classes.slider_animation} >
                {props.images.map(({src}) =>(
                <Slide className={classes.listing_image} index={src}> <img src={"http://rinx.tplinkdns.com:3002/static/" + src } alt="Lisitng"/>   </Slide>    
                ))}
                </Slider>
                <div>
                 <span>Slide Actual </span>{props.currentSlide == 0 ? "0" : props.currentSlide} din {props.images.length-1}
                 <input onChange={(event) => setCurrentSlide(event.target.value)}></input>
                </div>
        <div>
            {props.currentSlide == props.images.length-1 ? <ButtonFirst className={classes.first}>>>></ButtonFirst> : "" }
        </div>
        <ButtonBack className={classes.back}>></ButtonBack> <ButtonNext className={classes.next}>></ButtonNext> 
        <MiniListingCarrousel {...props}/>
        </React.Fragment>
     
    )
}


export default WithStore(ListingCarrousel, state => ({
    currentSlide: state.currentSlide,   

}))

  
