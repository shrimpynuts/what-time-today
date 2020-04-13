import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { userIsAuthorized } from '../util/auth';
import moment from 'moment';
import './MyCalendar.scss';

const localizer = momentLocalizer(moment);

function getCalendars() {
  window.gapi.client.load('calendar', 'v3', function() {
      var request = window.gapi.client.calendar.calendarList.list({});
      request.execute(function(resp) {
          if(!resp.error) {
            var calendarIds = [];
            for(var i = 0; i < resp.items.length; i++) {
              calendarIds.push(resp.items[i].id);
            }
            // getEvents(calendarIds);
            console.log(calendarIds);
          }
          else {
            console.log(resp.error);
          }
      });
  });
}

// Gets all the events from gapi
function getAndDisplayEvents(setEvents) {

    if (!userIsAuthorized()) {
      console.log("Tried to get calendars when not signed in!");
      return;
    }

    getCalendars();

    console.log('Retrieving all events');

    var startDate = moment().startOf('week');
    console.log(startDate);
  
    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': startDate.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime'
    }).then(function(response) {
      var events = response.result.items;
      var i;
      var calendarEvents = [];
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var calendarEvent = {
          'title': event.summary,
          'start': new Date(event.start.dateTime),
          'end': new Date(event.end.dateTime),
          'hexColor': "f5f542"
        }
        calendarEvents.push(calendarEvent);
      }
  
      setEvents(calendarEvents);
    });
  }
  
// When you select an available slot, create the availability, add it to availabilities
// Also add the availability to the output for the parent component
function onSelectAvailableSlot(updateOutput, slotInfo, availabilities, setAvailabilities) {
    var newAvailability = {
        'title': 'Availability',
        'start': slotInfo.start,
        'end': slotInfo.end,
        'hexColor': "4d9e47",
        'availability': true,
    };
    // Update availabilities
    var newAvailabilities = [...availabilities];
    newAvailabilities.push(newAvailability);
    setAvailabilities(newAvailabilities);

    // Update parent's output
    updateOutput(newAvailabilities);
}

// Gets the style for each event rendered
function eventStyleGetter(event, start, end, isSelected) {
  var backgroundColor = '#' + event.hexColor;
  var style = {
      backgroundColor: backgroundColor,
      borderRadius: '3px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
  };
  return {
      style: style
  };
}

// When you select an availability event delete it
function onSelectEvent(event, e, availabilities, setAvailabilities, updateOutput) {
  if(event.availability) {
    var newAvailabilities = [...availabilities];
    newAvailabilities = newAvailabilities.filter((avail) => avail !== event);
    setAvailabilities(newAvailabilities);

    // Update parent's output
    updateOutput(newAvailabilities);

  } else {
    console.log("Selected event that is not availability, cannot delete");
  }

}

const MyCalendar = forwardRef((props, ref) => {
    const [events, setEvents] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);

    const minTime = new Date();
    minTime.setHours(8,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,59,59);

    const removeEvents = () => {
      setEvents([]);
    }

    useImperativeHandle(ref, () => {
        return {
            getAndDisplayEvents: () => {getAndDisplayEvents(setEvents);},
            removeEvents: removeEvents
        };
    });

    return (
      <div>

        <Calendar
        localizer={localizer}
        events={events.concat(availabilities)}
        selectable={true}
        onSelectSlot={(info) => onSelectAvailableSlot(props.addToOutput, info, availabilities, setAvailabilities)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400 }}
        defaultView={'week'}
        views={['week', 'day']}
        onSelectEvent={(event, e) =>onSelectEvent(event, e, availabilities, setAvailabilities, props.addToOutput)}
        eventPropGetter={(eventStyleGetter)}
        // scrollToTime={props.initDate}
        min={minTime}
        max={maxTime}
        />
      </div>
    )
});

export default MyCalendar;