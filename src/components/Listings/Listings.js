import React from 'react';
import Featured from './Featured/Featured'
import classes from './Listings.module.css'
import { Link } from "react-router-dom";
import Search from '../Navigation/Search/Search'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_LISTINGS = gql`
query($id:Int){
  listings(id:$id){
    id
    title
    price
    location
    surface
	images{
      src
      rel_id	
    }
  }
}

`;


const Listings = (props, id) => {
    const { loading, error, data } = useQuery(GET_LISTINGS, {
        variabiles:id
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const  priceWithSpaces = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    console.log(props)
    let promotedItem = data.listings.map(({id, title, images, price, location, surface}) =>{
        return (
    
            <div key={id} id={'promoted-item-' + id} className={classes.promoted_item}>
                <Link
                        to={{
                        pathname: '/listing/' + title.replace(/ /g,"-").toLowerCase() + "/" + id
                        }}
                        className={classes.promoted_item__listing}>
                    <img 
                        className={classes.listing_image}  
                        src={/*props.globalURL + "assets/images/"*/ "http://rinx.tplinkdns.com:3002/static/"  + images[0].src}
                        alt="Lisitng">
                        
                    </img>
                    <figcaption>
                      <span>{priceWithSpaces(price)} €</span>  
                        <div className={classes.caption_location}>
                            {location}
                        </div>
                        <div className={classes.caption_surface}>
                            {surface} m2
                        </div>
                    </figcaption>
                </Link >
            </div>

        )
    })
    return(
        <React.Fragment>
                <Search/>
        <section className={classes.promoted_listing}>
            <h2 className={classes.promoted_slogan}> Anunturi imobiliare promovate</h2>
            <div id={classes.promoted_items}>
                <figure>
                  {promotedItem}
                </figure>
                <div className={classes.listings_center__redirect}>
                    <button className={classes.listings_center__button}>Vezi toate anunturile</button>
                </div>
            </div>
            <Featured/>
        </section>
        </React.Fragment>
    )
}

export default Listings