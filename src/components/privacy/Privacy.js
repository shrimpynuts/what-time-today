import React from 'react';

export default function Privacy() {
    return (
        <div className="not-homepage">
            <p>Security and user data privacy is taken seriously.</p>
            <p>Signing in through Google allows access to your name, your email address, and your Google Calendar data.</p>
            <b>All of the above are not stored in any database.</b>
            <p>Thus, no emails will be sent to your email address.</p>
            <p>If you choose to sign in, your calendars are retrieved through the Google Calendar API and is only used to display on the home page.</p>
            <p>You may revoke access to your Google Calendar data by signing out, and the data will be removed from your session.</p>
            <p>The availabities that you select on the calendar only persist for your session and is not stored anywhere.</p>
            <p><b>None of your data will persist.</b></p>
            <p><b>Your data will never be shared publicly or with any third party.</b></p>
            <p>This project is <a style={{color: 'black'}} rel="noopener noreferrer" target="_blank" href="https://github.com/jonathancai11/what-time-today">open source</a>.</p>
            <p>If you have any questions or concerns, feel free to email caimjonathan@gmail.com.</p>
        </div>

    )
}