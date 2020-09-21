import React from 'react';
import classes from './Search.module.css'
import SearchLocation from './SearchLocations'
import store from "../../../redux/store";
import { Provider } from "react-redux";
const Search = (props) => {

    return (
        <section className={classes.main_search}>
            <h1 className={classes.main_slogan}>Bine ai venit!
                <br />
                <small>Site de imobiliare cu peste 200.000 de anunturi!</small>
            </h1>
            <div className={classes.main_search__container}>
                <nav className={classes.main_search__tab}>
                    <ul className={classes.category_tabs}>
                        <li className={classes.category_tab}><a href="/">Vanzare</a></li>
                        <li className={[classes.category_tab, classes.tab__highlighted].join(" ")}><a href="/">Inchirere</a></li>
                        <li className={classes.category_tab}><a href="/">Cumparare</a></li>
                    </ul>
                </nav>
                <div className={classes.main_search__locations}>
                    <label className={classes.search_location__label}>Locatii</label>
                    <Provider store={store}>
                        <SearchLocation />
                    </Provider>
                    <input className={classes.submit_search} type='submit' value='Afiseaza 21313 rezultate'></input>
                    <div className={classes.bottom_search}>
                        <i className={[classes.bottom_search__dropdown, 'fas fa-chevron-down'].join(" ")}></i>
                        <select className={[classes.bottom_search__option, classes.search_estate__select].join(" ")}>
                            <option value="default">Apartamente</option>
                            <option value="default">Case</option>
                            <option value="default">Terenuri</option>
                            <option value="default">Vile</option>
                        </select>
                        <i className={[classes.bottom_search__dropdown, 'fas fa-chevron-down'].join(" ")}></i>
                        <select className={[classes.bottom_search__option, classes.search_price__select].join(" ")}>
                            <option value="default">Pret</option>
                            <option value="default">Case</option>
                            <option value="default">Terenuri</option>
                            <option value="default">Vile</option>
                        </select>
                        <i className={[classes.bottom_search__dropdown, 'fas fa-chevron-down'].join(" ")}></i>
                        <select className={[classes.bottom_search__option, classes.search_surface__select].join(" ")}>
                            <option value="default">Suprafata construita</option>
                            <option value="default">Case</option>
                            <option value="default">Terenuri</option>
                            <option value="default">Vile</option>
                        </select>
                        <i className={[classes.bottom_search__dropdown, 'fas fa-chevron-down'].join(" ")}></i>
                        <select className={[classes.bottom_search__option, classes.search_rooms__select].join(" ")}>
                            <option value="default">Numarul de camere</option>
                            <option value="default">Case</option>
                            <option value="default">Terenuri</option>
                            <option value="default">Vile</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search;