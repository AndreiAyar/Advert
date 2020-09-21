import React, { useState, useEffect, useContext } from 'react'
import classes from './AddListing.module.css'
import axios from 'axios'
import { useMutation } from '@apollo/react-hooks';
import { MainStateContext } from '../MainState'
import gql from 'graphql-tag';
import {getCookie} from '../../helpers'

const ADDLISTING_GQL = gql`
  mutation addListing(
        $title: String!,
        $username:String!,
        $location:String!, 
        $description:String, 
        $price:String!, 
        $rooms:String!,
        $surface:String!
        $phone:String!,
        $src:[SrcArray]!
) {
    addListing(
        title: $title, 
        username:$username,
        location:$location
        description: $description, 
        price:$price, 
        rooms: $rooms,
        phone:$phone,
        surface:$surface,
        src:$src
        ) {
      success,
      message,
    }
  }
`;
const AddListing = () => {
    let [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(0);
    const [status, setStatus] = useState(0)
    const [titleInput, setTitleInput] = useState('')
    const [locationInput, setLocationInput] = useState('')
    const [roomsInput, setRoomsInput] = useState('')
    const [priceInput, setPriceInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [surfaceInput, setSurfaceInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')


    const [titleRefCache, setTitleRefCache] = useState(null);
    const [locationRefCache, setLocationRefCache] = useState(null);
    const [roomsRefCache, setRoomsRefCache] = useState(null);
    const [priceRefCache, setPriceRefCache] = useState(null);
    const [descriptionRefCache, setDescriptionRefCache] = useState(null);
    const [surfaceRefCache, setSurfaceRefCache] = useState(null);
    const [phoneRefCache, setPhoneRefCache] = useState(null);

    const fileUploadRef = React.createRef();
    const titleRef = React.createRef();
    const locationRef = React.createRef();
    const roomsRef = React.createRef();
    const priceRef = React.createRef();
    const descriptionRef = React.createRef();
    const surfaceRef = React.createRef();
    const phoneRef = React.createRef();

    const mainStateContext = useContext(MainStateContext)
    console.log(mainStateContext)
    let authUser = getCookie('_token')
    useEffect(() => {
        setTitleRefCache({ target: titleRef.current })
        setLocationRefCache({ target: locationRef.current })
        setRoomsRefCache({ target: roomsRef.current })
        setPriceRefCache({ target: priceRef.current })
        setDescriptionRefCache({ target: descriptionRef.current })
        setSurfaceRefCache({ target: surfaceRef.current })
        setPhoneRefCache({ target: phoneRef.current })
        console.log('[Component Did Update]')
    }, [titleInput, locationInput, descriptionInput, priceInput, surfaceInput, roomsInput, phoneInput])
    const [addListing, { data, loading }] = useMutation(ADDLISTING_GQL, {
        onCompleted(data) {
            console.log(data.register)
        }
    })

    const fileChangedHandler = event => {
        for (let i = 0; i <= event.target.files.length; i++) {
            setSelectedFiles(
                selectedFiles = [...selectedFiles],
                selectedFiles.push(event.target.files[i])
            )
        }
    }
    const titleChangeHandler = () => {
        setTitleInput(titleRefCache.target.value)
        if (titleRefCache.target.value == 0) {
            titleRefCache.target.style.borderColor = "#F38370"
        } else {
            titleRefCache.target.style.borderColor = "black"
        }
    }
    const locationChangeHandler = () => {
        setLocationInput(locationRefCache.target.value)
        if (locationRefCache.target.value == 0) {
            locationRefCache.target.style.borderColor = "#F38370"
        } else {
            locationRefCache.target.style.borderColor = "black"
        }
    }
    const roomsChangeHandler = () => {
        setRoomsInput(roomsRefCache.target.value)
        if (roomsRefCache.target.value == 0) {
            roomsRefCache.target.style.borderColor = "#F38370"
        } else {
            roomsRefCache.target.style.borderColor = "black"
        }
    }
    const descriptionChangeHandler = () => {
        setDescriptionInput(descriptionRefCache.target.value)
        if (descriptionRefCache.target.value == 0) {
            descriptionRefCache.target.style.borderColor = "#F38370"
        } else {
            descriptionRefCache.target.style.borderColor = "black"
        }
    }
    const priceChangeHandler = () => {
        setPriceInput(priceRefCache.target.value)
        if (priceRefCache.target.value == 0) {
            priceRefCache.target.style.borderColor = "#F38370"
        } else {
            priceRefCache.target.style.borderColor = "black"
        }
    }
    const surfaceChangeHandler = () => {
        setSurfaceInput(surfaceRefCache.target.value)
        if (surfaceRefCache.target.value == 0) {
            surfaceRefCache.target.style.borderColor = "#F38370"
        } else {
            surfaceRefCache.target.style.borderColor = "black"
        }
    }
    const phoneChangeHandler = () => {
        setPhoneInput(phoneRefCache.target.value)
        if (phoneRefCache.target.value == 0) {
            phoneRefCache.target.style.borderColor = "#F38370"
        } else {
            phoneRefCache.target.style.borderColor = "black"
        }
    }

    const uploadImage = async (e) => {
        e.persist();
        setIsUploading(true);
        const formData = new FormData()
        selectedFiles.map((file, index) => formData.append('file', file))
        formData.append('title', titleInput)
        //console.log(selectedFiles)/
        try {
            let res = await axios.post('http://rinx.tplinkdns.com:3020/add-image', formData, {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setStatus(percentCompleted)
                    console.log(percentCompleted)
                }
            })
            setSelectedFiles([])
            return res;
        } catch (error) {
            console.log(error.response)
        }
    }
    const submitHandler = async (e) => {
        e.persist();
        e.preventDefault();
        let x = await uploadImage(e)
        console.log(x)
        titleChangeHandler();
        locationChangeHandler();
        roomsChangeHandler();
        addListing({ 
        variables: { 
            title: titleInput, 
            price: priceInput, 
            username:authUser,
            location:locationInput,
            description: descriptionInput, 
            price:priceInput, 
            rooms: roomsInput,
            phone:phoneInput,
            surface:surfaceInput,
            price:priceInput,
            src: x.data.src } })
    }
    const ProgressBar = (props) => {
        return (
            <div className={classes.progress_bar} style={{ display: status === 0 ? 'none' : null, margin: '0 auto' }}>
                <Filler percentage={props.percentage} />
            </div>
        )
    }
    const Filler = (props) => {
        return <div className={classes.filler} style={{ width: `${props.percentage}%` }} />
    }

    return (
        <div className={classes.container}>
            <img style={{ width: '200px' }} ></img>
            <ProgressBar percentage={status} />
            <div>
                {/**{status} %  {status == '100' ? 'Done' : null} */}

            </div>
            <form className={classes.add_listing_form} onSubmit={submitHandler}>
                <div className={classes.form_control}>
                    <label for="title">Titlu anunt:</label>
                    <input ref={titleRef} id="title" name="title" type="text" onChange={titleChangeHandler} value={titleInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="location">Locatie:</label>
                    <input ref={locationRef} id="location" name="location" type="text" onChange={locationChangeHandler} value={locationInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="description">Descriere:</label>
                    <textarea ref={descriptionRef} id="description" name="title" type="text" onChange={descriptionChangeHandler} value={descriptionInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="price">Pret</label>
                    <input  ref={priceRef}  name="title" type="text" onChange={priceChangeHandler} value={priceInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="surface">Suprafata utila <span style={{fontSize:'0.5rem', display:'inline-block', verticalAlign:'top'}}>(m2)</span></label>
                    <input ref={surfaceRef} id="surface" name="title" type="text" onChange={surfaceChangeHandler} value={surfaceInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="rooms">Camere:</label>
                    <input ref={roomsRef} id="rooms" name="title" type="text" onChange={roomsChangeHandler} value={roomsInput} />
                </div>
                <div className={classes.form_control}>
                    <label for="phone">Telefon:</label>
                    <input ref={phoneRef} id="phone" name="title" type="text" onChange={phoneChangeHandler} value={phoneInput} />
                </div>
                <div className={classes.file_selecter}>
                    <label for="file">Adauga poze</label>
                    <input ref={fileUploadRef} id="file" name="file" type="file" onChange={fileChangedHandler} multiple="multiple" />
                    <button disabled={isUploading} type='submit'>Upload!</button>
                </div>

            </form>



        </div>
    )
}

export default AddListing