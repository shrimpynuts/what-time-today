import { outputToStringCopy } from './dateTime';

// https://stackoverflow.com/questions/46041831/copy-to-clipboard-with-break-line
export function copyToClipboard(e, id, output) {
    // Step 1: create a textarea element.
    // It is capable of holding linebreaks (newlines) unlike "input" element
    const myFluffyTextarea = document.createElement('textarea');

    // Step 2: Store your string in innerHTML of myFluffyTextarea element        
    myFluffyTextarea.innerHTML = outputToStringCopy(output);

    // Step3: find an id element within the body to append your myFluffyTextarea there temporarily
    const parentElement = document.getElementById(id);
    parentElement.appendChild(myFluffyTextarea);

    // Step 4: Simulate selection of your text from myFluffyTextarea programmatically 
    myFluffyTextarea.select();

    // Step 5: simulate copy command (ctrl+c)
    // now your string with newlines should be copied to your clipboard 
    document.execCommand('copy');
    // Step 6: Now you can get rid of your fluffy textarea element
    parentElement.removeChild(myFluffyTextarea);
};
