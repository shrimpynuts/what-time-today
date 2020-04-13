import { apiKey, clientId } from './config'

var GoogleAuth; // Google Auth object.
var SCOPES = ['https://www.googleapis.com/auth/calendar.events.readonly', 
  'https://www.googleapis.com/auth/calendar.readonly'];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

export function handleClientLoad(setUser, authenticatedCallback) {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  window.gapi.load('client:auth2', () => {initClient(setUser, authenticatedCallback)});
}

function initClient(setUser, authenticatedCallback) {

  // Retrieve the discovery document for version 3 of Google Drive API.
  // In practice, your app can retrieve one or more discovery documents.

  console.log("About to try to initialize gapi client");

  window.gapi.client.init({
      'apiKey': apiKey,
      'clientId': clientId,
      'scope': SCOPES,
      'discoveryDocs': DISCOVERY_DOCS
  }).then(function () {
    console.log("Successfully initialized gapi client");
    GoogleAuth = window.gapi.auth2.getAuthInstance();
    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen((status) => updateSigninStatus(status, setUser));

    setSigninStatus(null, setUser);

    authenticatedCallback();
    
  }).catch((err) => {
    console.log(err);
    console.log("Failed to initialize gapi client")
  });
}

function updateSigninStatus(status, setUser) {
  /**
   * Listener called when user completes auth flow. If the currentApiRequest
   * variable is set, then the user was prompted to authorize the application
   * before the request executed. In that case, proceed with that API request.
   */
  console.log("Update sign in status");
  setSigninStatus(status, setUser);
}

// Returns true if as a result you are signed out
export function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    console.log("Signing out!");
    GoogleAuth.signOut();
    return true;
  } else {
    // User is not signed in. Start Google auth flow.
    console.log("Signing in!");
    GoogleAuth.signIn();
    return false;
  }
}

export function userIsAuthorized() {
    if (GoogleAuth === undefined) {
        console.log("Google Auth not initialized yet");
        return false;
    } else {
        return GoogleAuth.isSignedIn.get();
    }
}

export function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(status, setUser) {
  var user = GoogleAuth.currentUser.get();
  var isAuthorized = user.hasGrantedScopes(SCOPES);
  if (isAuthorized) {
    // $('#sign-in-or-out-button').html('Sign out');
    // $('#revoke-access-button').css('display', 'inline-block');
    // $('#auth-status').html('You are currently signed in and have granted ' +
    //     'access to this app.');
    setUser(user);
    console.log(user);
    console.log("Currently signed in and granted access to this app");
  } else {
    // $('#sign-in-or-out-button').html('Sign In/Authorize');
    // $('#revoke-access-button').css('display', 'none');
    // $('#auth-status').html('You have not authorized this app or you are ' +
    //     'signed out.');
    setUser(null);
    console.log("Have not authorized this app or signed out");
  }
}
