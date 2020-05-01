import {messageTypes} from '../App';
 
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"];

const moment = require('moment-timezone');

function formatAMPM(date) {
  // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}


export function outputToString(output, timeZone, messageType, AMPM, MonthDay) {
  // Currently only supporting single day availabilities
  if (!timeZone) {
    return ["Copy not working!! Notify me in the feedback form please!"];
  }

  if (output.length === 0) return ["Nothing selected. Click and drag on the calendar to select availability."];

  // Sort by start time
  var sortedOutput = [...output];
  sortedOutput.sort((a, b) => a.start - b.start);

  // Construct resulting string
  var result = [];
  for (let i = 0; i < output.length; i++) {
    let out = sortedOutput[i];

    let start = new Date(out.start.toLocaleString("en-US", {timeZone: timeZone}));
    let end = new Date(out.end.toLocaleString("en-US", {timeZone: timeZone}));
    // var longtz = out.start.toTimeString().match(/\((.+)\)/)[1];
    var shorttz = moment().tz(timeZone).zoneAbbr();
    
    // let month = monthNames[out.start.getMonth()];
    let day = dayNames[start.getDay()];
    let monthNum = start.getMonth() + 1;
    let dayNum = start.getDate();

    let startTime = AMPM ? formatAMPM(start) : start.getHours() + ":" + (start.getMinutes()<10?'0':'') + start.getMinutes() ;
    let endTime = AMPM ? formatAMPM(end) : end.getHours() + ":" + (end.getMinutes()<10?'0':'') + end.getMinutes() ;

    let singleResult = MonthDay ? `${day} (${monthNum}/${dayNum}) ${startTime} - ${endTime} ${shorttz}`
     : `${day} (${dayNum}/${monthNum}) ${startTime} - ${endTime} ${shorttz}`;

    result.push(singleResult);
  }
  
  
  if (messageTypes[0] === messageType) { // NORMAL
    result.unshift("I\'m available these times:");
  }
  if (messageTypes[1] === messageType) { // CUTE
    result.unshift("Can we please do one of these times 🥺👉👈?"); 
  }
  if (messageTypes[2] === messageType) { // AGGRESSIVE
    result.unshift("This is the last time I'm sending you my availability 😡"); 
  }
  if (messageTypes[3] === messageType) { // ELON
    result = ["I don't have time."]
  }
  if (messageTypes[4] === messageType) { // RAW
  }
  if (messageTypes[5] === messageType) { // Inverse
    result.unshift("I cannot do these times:"); 
  }
  
  return result;
}

export function outputToStringCopy(output, timeZone, messageType, AMPM, MonthDay) {
  var out = outputToString(output, timeZone, messageType, AMPM, MonthDay);
  var result = out.join("\r\n");
  return result;
}
