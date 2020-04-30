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


export function outputToString(output, timeZone) {
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
    let monthNum = start.getMonth();
    let dayNum = start.getDate();

    let startTime = formatAMPM(start);
    let endTime = formatAMPM(end);
    
    let singleResult = `${day} (${monthNum}/${dayNum}) ${startTime} - ${endTime} ${shorttz}`;
    result.push(singleResult);
  }

  result.unshift("I\'m available these times:");
  return result;
}

export function outputToStringCopy(output, timeZone) {
  var out = outputToString(output, timeZone);
  var result = out.join("\r\n");
  return result;
}
