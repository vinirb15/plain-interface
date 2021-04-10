import { gapi } from 'gapi-script';
const CLIENT_ID = "378284412150-7j8p2ek1hb1a239bb674tbjqiqdre0nd.apps.googleusercontent.com"
const API_KEY = "AIzaSyDMoik280-lm7A7TOaDQZJPuDfVgVfQzNg"
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
const SCOPES = "https://www.googleapis.com/auth/calendar.events"

export default function ExportEvent(email, title, description, startTime, endTime) {
   let fullTime = new Date()
   let timeZone = fullTime.toString().split('-')[1].split("").splice(0,2).join("")
    gapi.load('client:auth2', () => {
        console.log('Loaded client')
        console.log(email, title, description, startTime, endTime)

        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })

        gapi.client.load('calendar', 'v3', () => console.log('Google Calendar'))

        gapi.auth2.getAuthInstance().signIn()
            .then(() => {

                var event = {
                    'summary': `${title}`,
                    // 'location': '800 Howard St., San Francisco, CA 94103',
                    'description': `${description}`,
                    'start': {
                        'dateTime': `${startTime}:00-${timeZone}:00`,
                        // 'dateTime': `${startTime}:00-06:00`,
                        // 'timeZone': 'US/Central',
                    },
                    'end': {
                        'dateTime': `${endTime}:00-${timeZone}:00`,
                        // 'dateTime': `${endTime}:00-06:00`,
                        // 'timeZone': 'US/Central',
                    },
                    // 'recurrence': [
                    //   'RRULE:FREQ=DAILY;COUNT=2'
                    // ],
                    // 'attendees': [
                    //     { 'email': 'gian@bemaxgroup.com' },
                    // ],
                    'reminders': {
                        'useDefault': false,
                        'overrides': [
                            { 'method': 'email', 'minutes': 24 * 60 },
                            { 'method': 'popup', 'minutes': 10 },
                        ],
                    },
                }

                try {
                    var request = gapi.client.calendar.events.insert({
                        'calendarId': `${email}`,
                        'resource': event,
                    })
                } catch (error) {
                    alert(error)
                }


                request.execute(event => {
                    if (event.error) {
                        alert(event.error.message)
                    } else {
                        console.log(event)
                        alert(`Event exported`)
                        window.open(event.htmlLink)
                    }
                })
            })
    })
}