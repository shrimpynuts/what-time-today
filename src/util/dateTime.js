// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", 
  "Thursday", "Friday", "Saturday"];

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


export function outputToString(output) {
  // Currently only supporting single day availabilities

  if (output.length === 0) return ["Nothing selected. Click and drag on the calendar to select a chunk of availability."];

  // Sort by start time
  var sortedOutput = [...output];
  sortedOutput.sort((a, b) => a.start - b.start);

  // Construct resulting string
  var result = [];
  for (let i = 0; i < output.length; i++) {
    let out = sortedOutput[i];
    // var longtz = out.start.toTimeString().match(/\((.+)\)/)[1];
    var shorttz = out.start.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
    
    // let month = monthNames[out.start.getMonth()];
    let day = dayNames[out.start.getDay()];
    let monthNum = out.start.getMonth();
    let dayNum = out.start.getDate();

    let startTime = formatAMPM(out.start);
    let endTime = formatAMPM(out.end);
    
    let singleResult = `${day} (${monthNum}/${dayNum}) from ${startTime} to ${endTime} ${shorttz}`;
    result.push(singleResult);
  }
  return result;
}
