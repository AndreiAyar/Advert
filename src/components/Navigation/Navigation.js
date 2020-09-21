import React, { useContext } from 'react';
import classes from './Navigation.module.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import Search from './Search/Search';
import { Route, Link, Switch, } from "react-router-dom";
import Listings from '../Listings/Listings'
import ListingQuery from '../Listings/Listing/Listing'
import Register from '../Register/Register'
import { MainStateContext } from '../MainState'
import Login from '../Login/Login';
import AddListing from '../AddListing/AddListing'
const Navigation = (props) => {
    const url = props.globalURL
    let attachedClasses = [classes.secondary_nav__item, classes.secondary_nav__item__nav_button];
    const mainStateContext = useContext(MainStateContext);
    // / <i className="fas fa-caret-down"></i>
    return (
        <React.Fragment>
            <header className={classes.main_header}>
                <div className={classes.main_header__navbar}>
                    <nav className={classes.main_nav}>

                        <Link to="/" className={classes.main_header__brand}>
                            <img src="/assets/logo.svg" alt="Storia" />
                        </Link>
                        <ul className={classes.main_nav__items}>
                            <li className={classes.main_nav__item}><a href="http://google.ro"><i class="fab fa-adversal"></i>Anunturi</a></li>
                            <li className={classes.main_nav__item}><a href="http://google.ro"><i class="fas fa-door-open"></i>Ansambluri rezidentiale</a></li>
                            <li className={classes.main_nav__item}><a href="http://google.ro"><i class="fas fa-building"></i>Companii</a></li>
                            <li className={classes.main_nav__item}><a href="http://google.ro"><i class="fas fa-atlas"></i>Anunturi Internationale </a></li>
                        </ul>
                    </nav>
                    <nav className={classes.secondary_nav}>
                        <ul className={classes.secondary_nav__items}>
                            <Link
                                to={{
                                    pathname: mainStateContext.state.user ? '/my-account' : '/login'
                                }}
                                className={classes.secondary_nav__item} >

                                <div className={classes.secondary_nav__item_register}>
                                    {mainStateContext.state.user
                                    ?
                                       <div style={{dispaly:'inline-block'}}>
                                        <div className={classes.avatar}>
                                            {mainStateContext.state.user.username[0]}
                                        </div>
                                        <div style={{display:'inline-block'}}>{' ' + mainStateContext.state.user.username}</div>
                                    </div>
                                    :
                                    'Login'}
                                </div>
                            </Link>
                            {/*</div>  <li className={classes.secondary_nav__item}><a href="http://google.ro"><i className="fas fa_user_circle"> </i> Contul Meu</a></li>*/}
                            <Link to="/add-listing">
                                <li className={attachedClasses.join(" ")}><a href="http://google.ro"><i class="fas fa-layer-group"></i>Adauga Anunt</a></li>
                            </Link>
                        </ul>
                    </nav>
                    <div className={classes.advertising}> <p>Salut, R</p><img src="/assets/adv.svg"/></div>
                </div>
            </header>
            <Switch>
                <Route path="/" exact component={() => <Listings globalURL={props.globalURL} />} />
                <Route path="/listing/:title/:id" component={(props) => <ListingQuery {...{
                    ...props,
                    url: url,
                }}

                />} />
                <Route path='/register' component={() => <Register />} />
                <Route path='/login' component={() => <Login />} />
                <Route path='/add-listing' component={() => <AddListing />} />
            </Switch>
        </React.Fragment>
    )
}

export default Navigation;