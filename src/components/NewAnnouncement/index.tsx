import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from '../../services/axios';
import jwt from 'jsonwebtoken';
import { useCookies } from 'react-cookie'

import Loader from '../Loader';

import Select from 'react-select';
import { locationsData, groupsData } from '../../data';

import './styles.css';

const GreenCheckbox = withStyles({
    root: {
        color: grey[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: CheckboxProps) => <Checkbox color="primary" {...props} />);

const NewAnnouncement: React.FC = () => {
    const [cookies, ,] = useCookies(["token"]);
    const token: any = cookies.token
    const [loaded, setLoaded] = useState<boolean>(true);
    const [checked, setChecked] = useState<boolean>(false);
    const [locationChecked, setLocationChecked] = useState<boolean>(false);
    const [optEveryone, setOptEveryone] = useState<boolean>(false);
    const [group, setGroup] = useState<any>([])
    const [location, setLocation] = useState<any>([])
    const [imageFile, setImageFile] = useState({
        selectedFile: "",
        type: ""
    })
    const [imageName, setImageName] = useState("")
    const [description, setDescription] = useState<any>(EditorState.createEmpty())
    const [subject, setSubject] = useState<string>("")
    const [confirmation, setConfirmation] = useState<boolean>(false)
    const [modalLoading, setModalLoading] = useState<boolean>(false)
    const [myPreview, setMyPreview] = useState<boolean>(false)

    const history = useHistory();

    useEffect(() => {
        handlePermissions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function createAnnouncement() {
        const id = localStorage.getItem('id');

        if (optEveryone === false && checked === false && locationChecked === false) {
            setConfirmation(false)
            return alert("Invalid announcement type")
        }

        if (subject === "") {
            setConfirmation(false)
            return alert("Invalid subject")
        }

        if (description._immutable._map.length <= 7) {
            setConfirmation(false)
            return alert("Invalid description")
        }

        const htmlDescription = draftToHtml(convertToRaw(description.getCurrentContent()))
        let created = new Date()
        const data = {
            groups_ids: group,
            owner_id: id,
            locations_ids: location,
            image: imageFile,
            subject: subject,
            info: htmlDescription,
            createdAt: created.toString().split("").splice(4, 17).join("")
        }

        if (subject !== undefined
            && description !== undefined) {
            try {
                setModalLoading(true)
                await axios.post(`/api/v1/announcements`, data)
                setConfirmation(false)
                alert("Announcement created")
                history.push(`/announcements`)
            } catch (error) {
                setModalLoading(false)
                alert(error)
            }
        }
    }

    function handlePermissions() {
        jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
            if (err) {
                alert(err)
            } else {
                if (decoded.modules.announcements.write === false) {
                    alert("Permission denied")
                    window.location.href = `${process.env.REACT_APP_URL}`
                } else {
                    setLoaded(false)
                }
            }
        })
    }

    function handleChange() {
        if (checked === false) {
            setChecked(true)
        } else if (checked === true) {
            setChecked(false)
        }
    }

    function handleLocation() {
        if (locationChecked === false) {
            setLocationChecked(true)
        } else if (locationChecked === true) {
            setLocationChecked(false)
        }
    }

    function handleEveryone() {
        if (optEveryone === false) {
            setOptEveryone(true)
            setGroup([])
            setLocation([])
        } else if (optEveryone === true) {
            setOptEveryone(false)
        }
    }

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

    const handleSelectGroup = (event: any) => {
        setGroup(event)
    };

    const handleSelectLocation = (event: any) => {
        setLocation(event)
    };

    window.onclick = function (event: any) {
        if (event.target.className === 'modal') {
            setConfirmation(false)
        }
    }

    const groups = (
        <div className="specific-groups">

            <FormControlLabel
                control={
                    <GreenCheckbox
                        onChange={handleChange}
                        name="checkedG"
                    />}
                label="Specific Group"
                checked={checked ? true : false}
            />

            <Select
                isMulti
                name="colors"
                options={groupsData}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectGroup}
            />
        </div>
    )

    const locations = (
        <div className="specific-groups">
            <FormControlLabel
                control={
                    <GreenCheckbox
                        onChange={handleLocation}
                        name="checkedA"
                    />}
                label="Specific Location"
                checked={locationChecked ? true : false}
            />

            <Select
                isMulti
                name="colors"
                options={locationsData}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleSelectLocation}
            />

        </div>
    )

    const myModal = (
        <div id="myModal" style={{ display: confirmation ? "block" : "none" }} className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <span onClick={() => setConfirmation(false)} className="close">&times;</span>
                    <h2>
                        Your announcement is about to be published.
                        When publishing an announcement all selected users will receive an email and will be able
                        to read the announcement on their pages.
                        Would you like to publish it now?
                    </h2>
                </div>
                <div className="modal-confirmation">
                    <form>
                        {(modalLoading ? <Loader />
                            :
                            <>
                                <button type="button" onClick={() => setConfirmation(false)} className="cancelbtn">No</button>
                                <button type="button" onClick={createAnnouncement} className="deletebtn">Yes</button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>)

    const preview = (
        <div style={{ display: myPreview ? "block" : "none", maxWidth: "100%" }}>
            <span onClick={() => setMyPreview(false)} className="close">&times;</span>
            <h1>{subject}</h1>
            <div dangerouslySetInnerHTML={{ __html: draftToHtml(convertToRaw(description.getCurrentContent())) }}></div>
        </div >)

    return (
        loaded ? <Loader />
            :
            <div className="new-announcement">
                <h1>FEG Announcement</h1>
                <div className="create-announcement">
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                name="checkedG"
                                onChange={handleEveryone}
                            />}
                        label="Everyone"
                        disabled={checked || locationChecked ? true : false}
                    />
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                onChange={handleChange}
                                name="checkedG"
                            />}
                        label="Specific Group"
                        style={{ display: checked ? "none" : "block" }}
                        checked={checked ? true : false}
                        disabled={optEveryone ? true : false}
                    />
                    {
                        (checked ? groups : <></>)
                    }
                    <FormControlLabel
                        control={
                            <GreenCheckbox
                                onChange={handleLocation}
                                name="checkedA"
                            />}
                        label="Specific Location"
                        style={{ display: locationChecked ? "none" : "block" }}
                        checked={locationChecked ? true : false}
                        disabled={optEveryone ? true : false}
                    />
                    {
                        (locationChecked ? locations : <></>)
                    }
                </div>
                <div className="utils">
                    <h4>Subject</h4>
                    <input
                        type="text"
                        name="nameInput"
                        value={subject}
                        maxLength={250}
                        onChange={e => setSubject(e.target.value)}
                    />
                    <h4>Picture</h4>
                    <div className="imageInput">
                    <label style={{ display: (imageName.length <= 0 || imageName === undefined) ? "" : "none" }} htmlFor='inputFileImg'>+</label>
                    <label style={{ display: (imageName.length >= 1 && imageName !== undefined) ? "" : "none", padding: "7px 10px" }} htmlFor='inputFileImg'>{imageName}</label>
                        <input
                            id="inputFileImg"
                            className="typefile"
                            type="file"
                            accept=".jpg,.png"
                            onChange={event => fileSelect(event.target.files)}
                        />
                        <p>images less than 4 mb only</p>
                    </div>
                    <h4>Announcement</h4>
                    <Editor
                        editorState={description}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={e => { setDescription(e) }}
                    />
                </div>
                <button className="button" onClick={() => setConfirmation(true)}>Publish</button>
                {
                    myModal
                }
                {
                    preview
                }
                <button onClick={() => { setMyPreview(true) }}>preview content</button>
            </div>
    );
}

export default NewAnnouncement;