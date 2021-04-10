import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Selection from 'react-select';
import { locationsData, groupsData } from '../../data';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';

import { useCookies } from 'react-cookie'
import axios from '../../services/axios';
import jwt from 'jsonwebtoken';
import './styles.css';

import Loader from '../Loader';

import ExportEvent from './exportEvent';
import Formatter from '../CompanyAnnouncements/Formatter';

const userEmail = localStorage.getItem('email')

const Calendar: React.FC = () => {
  const [cookies, ,] = useCookies(["token"]);
  const token: any = cookies.token
  const todayDate = new Date()
  const [loaded, setLoaded] = useState<boolean>(true)
  const [currentEvents, setCurrentEvents] = useState([])
  const [allEvents, setAllEvents] = useState([{
    allDay: true,
    id: "",
    title: "",
    type: "",
    address: "",
    color: "",
    description: "",
    start: "",
    end: "",
    full_name: "",
    groups_ids: [],
    locations_ids: [],
  }])
  const [show, setShow] = useState(false)
  const [modal, setModal] = useState<boolean>(false)
  const [modalUpdate, setModalUpdate] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [eventAddress, setEventAddress] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [group, setGroup] = useState<any>([])
  const [location, setLocation] = useState<any>([])
  const [description, setDescription] = useState<string>('')
  const [color, setColor] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [showGroup, setShowGroup] = useState<boolean>(false)
  const [showLocation, setShowLocation] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<string>(`${todayDate.toISOString().replace(/T.*$/, '')}T08:00`)
  const [endTime, setEndTime] = useState<string>(`${todayDate.toISOString().replace(/T.*$/, '')}T08:30`)
  const [personal, setPersonal] = useState<boolean>(false)
  const [general, setGeneral] = useState<boolean>(false)
  const [specifics, setSpecifics] = useState<boolean>(false)
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const [permission, setPermission] = useState({
    list: false,
    read: false,
    write: false,
  })

  useEffect(() => {
    handleLoaded()
    handlePermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleLoaded() {
    try {
      const response: any = await axios.get(`/api/v1/events/sample`)
      setAllEvents(response.data.results)
      console.log(response.data.results)
      setLoaded(false)
    } catch (error) {
      alert(error)
    }

  }

  function handlePermissions() {
    if (localStorage.getItem('token')) {
      jwt.verify(localStorage.getItem('token')!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
        if (err) {
          alert(err)
        } else {
          setPermission(decoded.modules.events)
        }
      })
    } else {
      jwt.verify(token!.toString(), '8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb', (err: any, decoded: any) => {
        if (err) {
          alert(err)
        } else {
          setPermission(decoded.modules.events)
        }
      })
    }
  }

  async function handleCreateEvent() {
    if (title === "") {
      return alert("invalid title")
    }
    if (type === "") {
      return alert("invalid type")
    }
    if (eventAddress === "") {
      return alert("invalid address")
    }
    if (description === "") {
      return alert("invalid description")
    }

    if (startTime === "") {
      return alert("invalid start time")
    }

    if (endTime === "") {
      return alert("invalid end time")
    }

    if (general === true) {
      setGroup([])
      setLocation([])
      setColor('#007619')
    }

    const data =
    {
      title: title,
      type: type,
      locations_ids: location,
      groups_ids: group,
      address: eventAddress,
      description: description,
      start: startTime,
      end: endTime,
      color: color,
      isForMe: personal,
      isForEveryone: general,
    }

    if (general === false && personal === false && color === "") {
      return alert("Please select one event type")
    }
    if (general !== false
      || personal !== false
      || color !== "") {
      try {
        setModalLoading(true)
        await axios.post(`/api/v1/events`, data);
        alert(`Event Created`);
        setModal(false)
        setModalLoading(false)
        setLoaded(true)
        handleLoaded()
      } catch (error) {
        alert(error);
        setModalLoading(false)
      }
    }
  }

  async function handleUpdateEvent() {

    if (location === null || undefined) {
      setLocation([])
    }

    if (group === null || undefined) {
      setGroup([])
    }

    const data =
    {
      title: title,
      type: type,
      locations_ids: location,
      groups_ids: group,
      address: eventAddress,
      description: description,
      start: startTime,
      end: endTime,
      color: color,
      isForMe: personal,
      isForEveryone: general,
    }

    try {
      setModalLoading(true)
      await axios.put(`/api/v1/events/${id}`, data);
      alert(`Event Updated`);
      setLoaded(true)
      handleLoaded()
      setModalLoading(false)
      setModalUpdate(false)
    } catch (error) {
      alert(error);
      setModalLoading(false)
    }
  }

  async function handleDeleteEvent() {
    try {
      if (window.confirm(`Are you sure you want to delete the event '${title}'`)) {
        setModalLoading(true)
        await axios.delete(`/api/v1/events/${id}`);
        alert('Event deleted')
        setModalLoading(false)
        setModalUpdate(false)
        setLoaded(true)
        handleLoaded()
      }
    } catch (error) {
      alert(error)
      setModalLoading(false)
    }
  }

  async function handleDateSelect(selectInfo: any) {
    var converter = (selectInfo.endStr.split("").splice(8, 9).join("") - 1).toString()
    if (permission.read === false) {
      alert('Insufficient permissions')
    } else {
      if (converter.toString().length === 1) {
        converter = `0${converter}`
      }
      const startEventTime = (`${selectInfo.startStr}T08:00:00`)
      const endEventTime = (`${selectInfo.endStr.split("").splice(0, 8).join("") + converter}T08:30:00`)
      resetStates(startEventTime, endEventTime)
    }
  }

  function resetStates(startTime: any, endTime: any) {
    if (permission?.read === false) {
      alert('Insufficient permissions')
    }
    else if (startTime !== false && endTime !== false) {
      if (permission?.write === false) {
        setPersonal(true)
      } else {
        setPersonal(false)
      }
      setGeneral(false)
      setSpecifics(false)
      setShowGroup(false)
      setShowLocation(false)
      setTitle('')
      setEventAddress('')
      setType('')
      setGroup([])
      setLocation([])
      setDescription('')
      setStartTime(startTime)
      setEndTime(endTime)
      setModal(true)
    } else {
      if (permission?.write === false) {
        setPersonal(true)
      } else {
        setPersonal(false)
      }
      setGeneral(false)
      setSpecifics(false)
      setShowGroup(false)
      setShowLocation(false)
      setTitle('')
      setEventAddress('')
      setType('')
      setGroup([])
      setLocation([])
      setDescription('')
      setStartTime(`${todayDate.toISOString().replace(/T.*$/, '')}T08:00`)
      setEndTime(`${todayDate.toISOString().replace(/T.*$/, '')}T08:30`)
      setModal(true)
    }
  }

  async function handleEventClick(clickInfo: any) {
    try {
      await axios.get(`/api/v1/events/${clickInfo.event.id}`).then(event => {
        setEndTime(event.data.results.event_end.split('').splice(0, 16).join(''))
        setStartTime(event.data.results.event_start.split('').splice(0, 16).join(''))
        setEventAddress(event.data.results.event_address)
        setDescription(event.data.results.event_description)
        setGroup(event.data.results.groups_ids)
        setLocation(event.data.results.locations_ids)
        setType(event.data.results.event_type)
        setTitle(event.data.results.event_title)
        setId(event.data.results.event_id)
        setColor(event.data.results.event_color)
        setSpecifics(false)

        setShowGroup(false)
        setShowLocation(false)

        if (event.data.results.event_is_for_me === false && event.data.results.event_is_for_everyone === false) {
          setSpecifics(true)
          if (event.data.results.groups_ids.length !== 0 && event.data.results.locations_ids.length !== 0) {
            setShowGroup(true)
            setShowLocation(true)
          }
          if (event.data.results.groups_ids.length !== 0) {
            setShowGroup(true)
          }
          if (event.data.results.locations_ids.length !== 0) {
            setShowLocation(true)
          }
        }

        setPersonal(event.data.results.event_is_for_me)
        setGeneral(event.data.results.event_is_for_everyone)

      })
      setModalUpdate(true)
    } catch (error) {
      alert(error)
    }
  }

  function handleEvents(events: any) {
    setCurrentEvents(events)
  }

  function renderEventContent(eventInfo: any) {
    return (
      <>
        <b>{eventInfo.timeText} </b>
        <i> {eventInfo.event.title}</i>
      </>
    )
  }

  function changeState(boolean: any) {
    if (boolean === true) {
      setShow(false)
    }
    else {
      setShow(true)
    }
  }

  function renderSidebarEvent(event: any) {
    return (
      <li key={event.id}>
        <p style={{ backgroundColor: event.backgroundColor ? event.backgroundColor : "#3788d8", border: event.borderColor }} className="list-itens">{event.title}</p>
        <div style={{ display: show ? "block" : "none" }} onLoad={() => console.log(event)}>
          <b> {(event.startStr ? "Start: " : "") + event.startStr.split('').splice(0, 10).join('')} </b>
          <b> {Formatter(event.startStr.split('').splice(11, 2).join(''), event.startStr.split('').splice(13, 3).join(''))}</b>
          <br />
          <b> {(event.endStr ? "End: " : "") + event.endStr.split('').splice(0, 10).join('')} </b>
          <b> {Formatter(event.endStr.split('').splice(11, 2).join(''), event.endStr.split('').splice(13, 3).join(''))}</b>
        </div>
      </li>
    )
  }

  function handleShowGroup() {
    if (showGroup === true && showLocation === true) {
      setShowGroup(false)
      setGroup([])
      setColor('#f74f41')
    }
    if (showGroup === true && showLocation === false) {
      setShowGroup(false)
      setGroup([])
      setSpecifics(false)
      setColor('')
    }
    if (showGroup === false) {
      setShowGroup(true)
      setSpecifics(true)
      setColor('#ffc138')
    }
    if (showGroup === false && showLocation === true) {
      setColor('#a3259F')
    }
  }

  function handleShowLocation() {
    if (showLocation === true && showGroup === true) {
      setShowLocation(false)
      setLocation([])
      setColor('#ffc138')
    }
    if (showLocation === true && showGroup === false) {
      setShowLocation(false)
      setLocation([])
      setSpecifics(false)
      setColor('')
    }
    if (showLocation === false) {
      setShowLocation(true)
      setSpecifics(true)
      setColor('#f74f41')
    }
    if (showLocation === false && showGroup === true) {
      setColor('#a3259F')
    }
  }

  function handlePersonalEvent() {
    if (personal === true) {
      setPersonal(false)
      setColor('')
      setGroup([])
      setLocation([])
    }
    if (personal === false) {
      setPersonal(true)
      setColor('#418dee')
      setShowGroup(false)
      setShowLocation(false)
    }
  }

  function handleGeneralEvent() {
    if (general === true) {
      setGeneral(false)
      setColor('')
      setGroup([])
      setLocation([])
    }
    if (general === false) {
      setGeneral(true)
      setColor('#007619')
      setShowGroup(false)
      setShowLocation(false)
    }
  }

  window.onclick = function (event: any) {
    if (event.target.className === 'modal') {
      setModal(false)
      setModalUpdate(false)
    }
  }

  const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string)
  };

  const handleSelectGroup = (event: any) => {
    setGroup(event)
  };
  const handleSelectLocation = (event: any) => {
    setLocation(event)
  };

  withStyles({
    root: {
      color: grey[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props: CheckboxProps) => <Checkbox color="primary" {...props} />);

  const modalCreateEvent = (
    <div id="myModal" className="modal" style={{ display: modal ? "block" : "none" }}>
      <div className="modal-body">
        <div className="modal-header">
          <span onClick={() => setModal(false)} className="close">&times;</span>
          <h2>New Event</h2>
        </div>
        <div className="modal-box">
          <form>
            <TextField id="standard-basic" label="Add Title"
              placeholder=""
              inputProps={{ maxLength: 250 }}
              onChange={e => setTitle(e.target.value)}
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                value={type}
                onChange={handleChangeType}
              >
                <MenuItem value={"Meeting"}>Meeting</MenuItem>
                <MenuItem value={"Conference Call"}>Conference Call</MenuItem>
                <MenuItem value={"Project Delivery"}>Project Delivery</MenuItem>
                <MenuItem value={"Reporting"}>Reporting</MenuItem>
                <MenuItem value={"Travel and Vacation"}>Travel and Vacation</MenuItem>
                <MenuItem value={"Location Opening"}>Location Opening</MenuItem>

              </Select>
            </FormControl>

            <div style={{ display: permission.write ? "" : "none" }} className="groupsSection">
              <button className="button" style={{ background: "#418dee" }} disabled={general || specifics} type="button" onClick={() => handlePersonalEvent()}>Personal Event</button>
              <button className="button" style={{ background: "#f74f41" }} disabled={personal || general} type="button" onClick={() => handleShowLocation()} >Local Event</button>
              <button className="button" style={{ background: "#ffc138" }} disabled={personal || general} type="button" onClick={() => handleShowGroup()} >Group Event</button>
              <button className="button" style={{ background: "#007619" }} disabled={personal || specifics} type="button" onClick={() => handleGeneralEvent()}>General Event</button>
            </div>

            <div style={{
              display: showLocation ? "block" : "none",
              width: "100%",
              marginLeft: "10%",
            }}>
              <Selection
                isMulti
                name="colors"
                value={location}
                options={locationsData}
                className="basic-multi-select"
                placeholder="Select Locations"
                onChange={handleSelectLocation}
              />
            </div>

            <div style={{
              display: showGroup ? "block" : "none",
              width: "100%",
              marginLeft: "10%",
              marginTop: "1rem"
            }}>
              <Selection
                isMulti
                name="colors"
                value={group}
                options={groupsData}
                className="basic-multi-select"
                placeholder="Select Groups"
                onChange={handleSelectGroup}
              />
            </div>

            <TextField id="standard-basic"
              label="Event Address or Meeting Link"
              placeholder=""
              onChange={e => setEventAddress(e.target.value)}
            />

            <br />

            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              inputProps={{ maxLength: 4950 }}
              onChange={e => setDescription(e.target.value)}
              rowsMax={4}
            />

            <TextField
              id="datetime-start"
              label="Start time"
              type="datetime-local"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <br />

            <TextField
              id="datetime-end"
              label="End time"
              type="datetime-local"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {
              modalLoading ? <Loader />
                :
                <>
                  <button className="button" onClick={handleCreateEvent} type="button">Create Event</button>
                </>
            }
          </form>
        </div>
      </div>
    </div>)

  const modalEditEvent = (
    <div id="myModal" className="modal" style={{ display: modalUpdate ? "block" : "none" }}>
      <div className="modal-body">
        <div className="modal-header">
          <span onClick={() => setModalUpdate(false)} className="close">&times;</span>
          <h2>{(permission.write ? "true" : personal) ? "Update Event" : "Event information"}</h2>
        </div>
        <div className="modal-box">
          <form>
            <TextField id="standard-basic" label={title}
              placeholder="Update your title"
              inputProps={{ maxLength: 250 }}
              onChange={e => setTitle(e.target.value)}
              disabled={permission?.write ? false : true}
            />

            <FormControl>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                value={type}
                onChange={handleChangeType}
                disabled={permission?.write ? false : true}
              >
                <MenuItem value={"Meeting"}>Meeting</MenuItem>
                <MenuItem value={"Conference Call"}>Conference Call</MenuItem>
                <MenuItem value={"Project Delivery"}>Project Delivery</MenuItem>
                <MenuItem value={"Reporting"}>Reporting</MenuItem>
                <MenuItem value={"Travel and Vacation"}>Travel and Vacation</MenuItem>
                <MenuItem value={"Location Opening"}>Location Opening</MenuItem>

              </Select>
            </FormControl>

            <div className="groupsSection" style={{ display: permission?.write ? "" : "none" }}>
              <button className="button" style={{ background: "#418dee" }} disabled={general || specifics} type="button" onClick={() => handlePersonalEvent()}>Personal Event</button>
              <button className="button" style={{ background: "#f74f41" }} disabled={personal || general} type="button" onClick={() => handleShowLocation()} >Local Event</button>
              <button className="button" style={{ background: "#ffc138" }} disabled={personal || general} type="button" onClick={() => handleShowGroup()} >Group Event</button>
              <button className="button" style={{ background: "#007619" }} disabled={personal || specifics} type="button" onClick={() => handleGeneralEvent()}>General Event</button>
            </div>

            <div style={{
              display: showLocation ? "block" : "none",
              width: "100%",
              marginLeft: "10%",
            }}>
              <Selection
                isMulti
                name="colors"
                value={location}
                options={locationsData}
                className="basic-multi-select"
                placeholder="Select Locations"
                onChange={handleSelectLocation}
                isDisabled={permission?.write ? false : true}
              />
            </div>

            <div style={{
              display: showGroup ? "block" : "none",
              width: "100%",
              marginLeft: "10%",
              marginTop: "1rem"
            }}>
              <Selection
                isMulti
                name="colors"
                value={group}
                options={groupsData}
                className="basic-multi-select"
                placeholder="Select Groups"
                onChange={handleSelectGroup}
                isDisabled={permission?.write ? false : true}
              />
            </div>

            <TextField id="standard-basic"
              label={eventAddress}
              placeholder="Update your Event Address or Meeting Link"
              onChange={e => setEventAddress(e.target.value)}
              disabled={permission?.write ? false : true}
            />

            <br />

            <TextField
              id="standard-multiline-static"
              placeholder={description}
              label="Update your description"
              multiline
              inputProps={{ maxLength: 4950 }}
              onChange={e => setDescription(e.target.value)}
              rowsMax={4}
              disabled={permission?.write ? false : true}
            />

            <TextField
              id="datetime-start"
              label="Start time"
              type="datetime-local"
              // defaultValue={startTime}
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={permission?.write ? false : true}
            />

            <br />

            <TextField
              id="datetime-end"
              label="End time"
              type="datetime-local"
              // defaultValue={endTime}
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              disabled={permission?.write ? false : true}
            />
            {
              modalLoading ? <Loader />
                :
                <>
                  <button style={{ background: "var(--bg-color)", display: permission.read ? "" : "none" }} onClick={() => ExportEvent(userEmail, title, description, startTime, endTime)} type="button" className="cancelbtn">Export event</button>
                  <button style={{ background: "var(--bg-color)", display: (permission.write ? true : personal) ? "" : "none" }} onClick={handleUpdateEvent} type="button" className="cancelbtn">Update Event</button>
                  <button style={{ display: permission?.write ? "" : "none" }} onClick={handleDeleteEvent} type="button" className="deletebtn">Delete Event</button>
                </>
            }
          </form>
        </div>
      </div>
    </div>)

  return (
    (loaded ?
      <Loader />
      :
      <div className="calendar-app">
        {modalCreateEvent}
        {modalEditEvent}
        <div className="calendar-content">

          <div className='demo-app-sidebar'>
            <div className='demo-app-sidebar-section'>
              <h2>All Events ({currentEvents.length})</h2>
              <ul>
                {currentEvents.map(renderSidebarEvent)}
                <button className="more-info-button" type="button" onClick={() => changeState(show)}>{show ? "Hide info" : "Show info"}</button>
              </ul>
            </div>
          </div>

          <div className='demo-app'>
            <div className='demo-app-main'>
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                customButtons={{
                  myCustomButton: {
                    text: 'Create New Event',
                    click: function () {
                      resetStates(false, false)
                    },
                  },
                }}
                headerToolbar={{
                  left: 'prev,next myCustomButton',
                  center: 'title',
                  right: 'listMonth,timeGridDay,timeGridWeek,dayGridMonth,today'
                }}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                initialEvents={{ events: allEvents }} // alternatively, use the `events` setting to fetch from a feed
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                timeZone='US/Central'
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                handleWindowResize={true}
              />
            </div>
          </div>
        </div>
      </div>)
  )
}

export default Calendar;