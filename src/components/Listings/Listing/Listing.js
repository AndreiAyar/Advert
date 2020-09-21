import React, {useState, useEffect, useContext} from 'react';
import { getCookie } from '../../../helpers'
import classes from './Listing.module.css';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import ListingCarrousel from './ListingCarrousel'
import { CarouselProvider, CarouselContext, Slider, Slide, ButtonBack, ButtonNext, DotGroup, WithStore } from 'pure-react-carousel'

const GET_LISTING = gql`
query($id:Int){
  listings(id:$id){
    id
    userID
    userName
    title
    location
    description
    price
    surface
    phone
    rooms
		images{
      src
      rel_id	
    }
  }
}

`;

const ListingQuery = (props) => {
  const url = props.url
  const { loading, error, data } = useQuery(GET_LISTING, {
    variables:{id: Number(props.match.params.id)} /// 1  || Number(props.match.params.id)
});

if (loading) return <p>Loading...</p>;
if (error) return <p>Error :(</p>;

return(
  data.listings.map(LISTING_DATA =>
    <Listing  {...{...LISTING_DATA, url:url}} />
  ))
}

const Listing = (props) => {
  let x = getCookie('_token')
  console.log(x)
    return (
        <section key={props.id} className={classes.listing_container} >
            <article className={classes.listing_head__info}>
              <h1 className={classes.listing_title}> {props.title} </h1>
              <a href="/" className={classes.listing_location}><i className="fas fa-map-marker-alt"></i>{props.location} </a>
            </article>
          <article className={classes.listing_grid__container}>
              <article className={classes.listing_grid__carrousel}>
              <div className={classes.carrousel_container}>
                <CarouselProvider
                  className={classes.carrousel_slider}
                  naturalSlideWidth={20}
                  naturalSlideHeight={10}
                  totalSlides={props.images.length}
                  infinite={true}
                  visibleSlides={1} 
                  >
                <ListingCarrousel {...props}/>
                {/*props.images.map(({src}) =>( <div className={classes.image_container}><img src={props.url + "assets/images/" + props.id + '/'+ src } alt="Lisitng"/></div>))*/}
                </CarouselProvider>
                </div>
              </article>
              <aside className={classes.listing_message}>
                <div className={classes.listing_user}>
                  <div className={classes.listing_user__avatar}>
                  <svg className={classes.svg_avatar} viewBox="0 0 20 20">
                    <path fill="none" d="M8.652,16.404c-0.186,0-0.337,0.151-0.337,0.337v2.022c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.022C8.989,16.555,8.838,16.404,8.652,16.404z"></path>
                    <path fill="none" d="M11.348,16.404c-0.186,0-0.337,0.151-0.337,0.337v2.022c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.022C11.685,16.555,11.535,16.404,11.348,16.404z"></path>
                    <path fill="none" d="M17.415,5.281V4.607c0-2.224-1.847-4.045-4.103-4.045H10H6.687c-2.256,0-4.103,1.82-4.103,4.045v0.674H10H17.415z"></path>
                    <path fill="none" d="M18.089,10.674V7.304c0,0,0-0.674-0.674-0.674V5.955H10H2.585v0.674c-0.674,0-0.674,0.674-0.674,0.674v3.371c-0.855,0.379-1.348,1.084-1.348,2.022c0,1.253,2.009,3.008,2.009,3.371c0,2.022,1.398,3.371,3.436,3.371c0.746,0,1.43-0.236,1.98-0.627c-0.001-0.016-0.009-0.03-0.009-0.047v-2.022c0-0.372,0.303-0.674,0.674-0.674c0.301,0,0.547,0.201,0.633,0.474h0.041v-0.137c0-0.372,0.303-0.674,0.674-0.674s0.674,0.302,0.674,0.674v0.137h0.041c0.086-0.273,0.332-0.474,0.633-0.474c0.371,0,0.674,0.302,0.674,0.674v2.022c0,0.016-0.008,0.03-0.009,0.047c0.55,0.391,1.234,0.627,1.98,0.627c2.039,0,3.436-1.348,3.436-3.371c0-0.362,2.009-2.118,2.009-3.371C19.438,11.758,18.944,11.053,18.089,10.674z M5.618,18.089c-0.558,0-1.011-0.453-1.011-1.011s0.453-1.011,1.011-1.011s1.011,0.453,1.011,1.011S6.177,18.089,5.618,18.089z M6.629,13.371H5.474c-0.112,0-0.192-0.061-0.192-0.135c0-0.074,0.08-0.151,0.192-0.174l1.156-0.365V13.371z M8.652,12.521c-0.394,0.163-0.774,0.366-1.148,0.55c-0.061,0.03-0.132,0.052-0.2,0.076v-0.934c0.479-0.411,0.906-0.694,1.348-0.879V12.521z M5.281,10c-1.348,0-1.348-2.696-1.348-2.696h5.393C9.326,7.304,6.629,10,5.281,10z M10.674,12.296c-0.22-0.053-0.444-0.084-0.674-0.084s-0.454,0.032-0.674,0.084v-1.168C9.539,11.086,9.762,11.06,10,11.05c0.238,0.01,0.461,0.036,0.674,0.078V12.296z M12.696,13.146c-0.068-0.024-0.14-0.046-0.2-0.076c-0.374-0.184-0.754-0.386-1.148-0.55v-1.188c0.442,0.185,0.87,0.467,1.348,0.879V13.146zM14.382,18.089c-0.558,0-1.011-0.453-1.011-1.011s0.453-1.011,1.011-1.011c0.558,0,1.011,0.453,1.011,1.011S14.94,18.089,14.382,18.089z M13.371,13.371v-0.674l1.156,0.365c0.112,0.022,0.192,0.099,0.192,0.174c0,0.074-0.08,0.135-0.192,0.135H13.371z M14.719,10c-1.348,0-4.045-2.696-4.045-2.696h5.393C16.067,7.304,16.067,10,14.719,10z"></path>
                    <path fill="none" d="M10,16.067c-0.186,0-0.337,0.151-0.337,0.337V19.1c0,0.186,0.151,0.337,0.337,0.337s0.337-0.151,0.337-0.337v-2.696C10.337,16.218,10.186,16.067,10,16.067z"></path>
                  </svg>
                  </div>  
                  <div className={classes.listing_user__username}>
                    {props.userName}
                    <span>{props.phone}</span>
                  </div>
               </div>

                  <form className={classes.listing_message__input}>
 
                    <input type="text" name="name"  placeholder="Numele tau *"></input>
                    <input type="text" name="email"  placeholder="E-mail *"></input>
                    <input type="text" name="phone"  placeholder="Numarul tau de telefon "></input>
                    <textarea id="lead_message" type="message" value="Sunt interesat de anunt!" name="txt"></textarea>

                  </form>
                  <div className={classes.listing__message__actions}>
                     <button className={classes.listing_message_request__button} type='submit'>Trimite Mesajul</button>
                     <button className={classes.listing_message_favorite__button} type='submit'><i className="far fa-heart"></i> Salveaza la Favorite</button>
                  </div>
                </aside>
          </article>

              {props.description}
  
            <p>
              {props.userName}
            </p>
            <p>
              {props.price}
            </p>
              
            <p>
            {props.surface}
            </p>
              <p>
              {props.rooms}
              </p>
      </section>
 
    )
}

export default ListingQuery;