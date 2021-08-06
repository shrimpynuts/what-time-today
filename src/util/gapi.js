import { userIsAuthorized, forceSignOut } from "./auth";
import moment from "moment";
import { addCalendar, addEvent } from "../redux/actions";

export function getAndDisplayEvents(dispatch, newUserEmail) {
  if (!userIsAuthorized()) {
    console.log("Tried to get calendars when not signed in!");
    return;
  }
  
  let counter;

  var startDate = moment().startOf("week");

  window.gapi.client.load("calendar", "v3", function () {
    var request = window.gapi.client.calendar.calendarList.list({});
    request.execute(function (resp) {
      var calendars = resp.items;

      if (!resp.error) {
        if (calendars.length == 0) {
          forceSignOut();
        }
        counter = calendars.length;
        for (var i = 0; i < calendars.length; i++) {
          const calendar = calendars[i];
          calendar.visible = calendar.selected;
          calendar.color = calendar.backgroundColor;
          calendar.email = newUserEmail;
          dispatch(addCalendar(calendar));

          window.gapi.client.calendar.events
            .list({
              calendarId: calendar.id,
              timeMin: startDate.toISOString(),
              showDeleted: false,
              singleEvents: true,
              maxResults: 100,
              orderBy: "startTime",
            })
            .then(function (response) {
              var events = response.result.items;
              var i;
              var color = calendar.backgroundColor;
              for (i = 0; i < events.length; i++) {
                var event = events[i];
                var calendarEvent = {
                  title: event.summary,
                  start: new Date(event.start.dateTime),
                  end: new Date(event.end.dateTime),
                  hexColor: color,
                  summary: response.result.summary,
                  visible: true,
                  calendarId: calendar.id,
                  email: newUserEmail,
                };
                dispatch(addEvent(calendarEvent));
              }
              counter -= 1;
              if (counter == 0) {
                forceSignOut();
              }
            });
        }
      } else {
        console.log("Error retrieving calendars");
        console.log(resp.error);
      }
    });
  });
}
