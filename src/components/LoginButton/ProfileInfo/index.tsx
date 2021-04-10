import React, { useState } from 'react';
import { FiMail, FiFile } from 'react-icons/fi';
import axios from '../../../services/axios';
import './styles.css';

import Monograma from '../../../assets/Monograma.png';
import Loader from '../../Loader';

import { useCookies } from 'react-cookie'

const ProfileInfo = () => {
    const image = localStorage.getItem('image_url')
    const [update, setUpdate] = useState(false);
    const [updateFirstName, setUpdateFirstName] = useState(false);
    const [updateLastName, setUpdateLastName] = useState(false);
    const [updatePicture, setPicture] = useState(false);
    const [name, setName] = useState('')
    const [nameLast, setNameLast] = useState('')
    const [imageFile, setImageFile] = useState({
        selectedFile: "",
        type: "",
    })
    const [imageName, setImageName] = useState("")
    const [loaded, setLoaded] = useState(false);
    const firstName = localStorage.getItem('firstName')
    const lastName = localStorage.getItem('lastName')
    const userID = localStorage.getItem('id')
    const email = localStorage.getItem('email')

    const [, setCookie] = useCookies(['token'])

    // function fileSelect(props: any) {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(props[0])

    //     reader.onload = (e: any) => {

    //         setImageFile({
    //             selectedFile: e?.target?.result,
    //             type: props[0].type
    //         })
    //     }
    // }

    function fileSelect(props: any) {
        if (props[0] === undefined) {
            setImageName("")
            setImageFile({
                selectedFile: "",
                type: "",
            })
            return
        }
        setImageName(props[0].name)
        const reader = new FileReader()
        reader.readAsDataURL(props[0])

        reader.onload = (e: any) => {
            setImageFile({
                selectedFile: e?.target?.result,
                type: props[0].type
            })
        }
    }

    function updateBtn() {
        if (update === false)
            setUpdate(true)
        else {
            setUpdate(false)
        }
    }

    function showFirstName() {
        if (updateFirstName === false)
            setUpdateFirstName(true)
        else {
            setUpdateFirstName(false)
        }
    }

    function showLastName() {
        if (updateLastName === false)
            setUpdateLastName(true)
        else {
            setUpdateLastName(false)
        }
    }

    function showPicture() {
        if (updatePicture === false)
            setPicture(true)
        else {
            setPicture(false)
        }
    }

    function handleLogout() {
        // alert('Disconnected User')
        setTimeout(() => {
            localStorage.clear();
            if (process.env.REACT_APP_ACCOUNT_URL) {
                window.location.href = `${process.env.REACT_APP_ACCOUNT_URL}/logout`
            } else {
                window.location.href = "https://account.systemfeg.com/logout"
            }
        }, 1000)
    }

    async function handleUpdate(id: string) {
        if (name === "") {
            setName(firstName!)
        }

        if (nameLast === "") {
            setNameLast(lastName!)
        }

        if (name !== "" && nameLast !== "") {
            const data = {
                firstName: name,
                lastName: nameLast,
                image: imageFile,
            }
            try {
                setLoaded(true)
                const response = await axios.put(`/api/v1/accounts/${id}`, data);
                await setCookie('token', response.data.token)
                localStorage.clear()
                window.location.reload()
            } catch (error) {
                alert('Error updating user');
                console.log(error)
                setLoaded(false)
            }
        }
    }

    const changeFirstName = (
        <>
            {/* <h4>Name</h4> */}
            <input
                type="text"
                name="nameInput"
                placeholder='New First Name'
                onChange={e => setName(e.target.value)}
            />
        </>
    )

    const changeLastName = (
        <>
            {/* <h4>Name</h4> */}
            <input
                type="text"
                name="nameInput"
                placeholder='New Last Name'
                onChange={e => setNameLast(e.target.value)}
            />
        </>
    )

    const changePicture = (
        <>
            {/* <h4>Name</h4> */}
            <label style={{ display: (imageName.length <= 0 || imageName === undefined) ? "" : "none" }} htmlFor='inputFileImg'>+</label>
            <label style={{ display: (imageName.length >= 1 && imageName !== undefined) ? "" : "none", fontSize: "17px" }} htmlFor='inputFileImg'>{imageName}</label>
            <input
                style={{ display: "none" }}
                id="inputFileImg"
                type="file"
                accept="image/*"
                onChange={event => fileSelect(event.target.files)}
            />
        </>
    )

    const updateOn = (
        <>
            <hr />
            <div className="update-options">
                <h4>First Name</h4>
                <div className="options">
                    <p>{firstName}</p>
                    <button className="button" onClick={showFirstName}>edit</button>
                    {
                        (updateFirstName ? changeFirstName : <></>)
                    }
                </div>

                <h4>Last Name</h4>
                <div className="options">
                    <p>{lastName}</p>
                    <button className="button" onClick={showLastName}>edit</button>
                    {
                        (updateLastName ? changeLastName : <></>)
                    }
                </div>

                <h4>Picture</h4>
                <div className="options">
                    <img src={image ? image : Monograma} alt="FEG LOGO" />
                    <button className="button" onClick={showPicture}>edit</button>
                    {
                        (updatePicture ? changePicture : <></>)
                    }
                </div>
                {
                    loaded ?
                        <Loader />
                        :
                        <button className="save" onClick={() => handleUpdate(userID!)}>Save</button>
                }

            </div>
        </>
    )

    return (
        <div className="profile-box">
            <img src={image ? image : Monograma} alt="FEG LOGO" />
            <div className="about">
                <h2>{firstName} {lastName}</h2>
                <div className="container">
                    <FiMail color="#478fc8" size={20} />
                    <p>{email}</p>
                </div>
                <button onClick={handleLogout}>Sign Out</button>
            </div>

            <hr />

            <div className="my-profile">
                <FiFile style={{
                    background: '#c8c8d3',
                    borderRadius: '8px',
                    padding: '0.7rem',
                    color: '#1eb6b0'
                }} size={45} />
                <div className="container">
                    <h3>{firstName} {lastName}</h3>
                    <div className="update-profile">
                        <h4>Update your settings</h4>
                        <button className="button" onClick={updateBtn}>edit</button>
                    </div>
                </div>
            </div>
            {
                (update ? updateOn : <></>)
            }

        </div>

    )
}

export default ProfileInfo;