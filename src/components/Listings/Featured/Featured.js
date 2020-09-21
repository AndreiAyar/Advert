import React from 'react';
import classes from './Featured.module.css'

const Featured = () => {
    return (
    <section className={classes.featured_listing}>
        <h1 className={classes.featured_listing__slogan}>Cauta in categorii:</h1>
            <div className={classes.featured_categories}>
                <nav className={classes.featured_categories__nav}>
                    <ul className={classes.featured_categories__list}>
                        <li id={classes.featured_item-2} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-building light'].join(" ")}></i><h3>case</h3></a></li>
                        <li id={classes.featured_item-1} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-home'].join(" ")}></i><h3>apartamente</h3></a></li>
                        <li id={classes.featured_item-3} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>camere de inchiriat</h3></a></li>
                        <li id={classes.featured_item-4} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>terenuri</h3></a></li>
                        <li id={classes.featured_item-5} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>spatii comerciale</h3></a></li>
                        <li id={classes.featured_item-6} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>depozite si hale</h3></a></li>
                        <li id={classes.featured_item-7} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>birouri</h3></a></li>
                        <li id={classes.featured_item-8} className={classes.featured_categories__item}><a href="/" className={classes.circle}><i className={[classes.icon, 'fas fa-bed'].join(" ")}></i><h3>ansambluri rezidentiale</h3></a></li>
                    </ul>
                </nav>
            </div>
        </section>

    )
}

export default Featured;