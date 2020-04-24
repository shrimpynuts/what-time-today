import React from 'react';

export default function Privacy() {
    return (
        <div className="not-homepage">
            <p>Your Google Calendar data will only be retrieved if you decide to sign in. </p>
            <p>If you choose to sign in, this data is retrieved through the Google Calendar API and is only used to display on the home page.</p>
            <p>You may revoke access to your Google Calendar data by signing out, and the data will be removed from your session.</p>
            <p>The availabities that you select on the calendar only persist for your session and is not stored anywhere.</p>
            <p>None of your data will persist.</p>
            <p>Your data will not be shared publicly or with any third party.</p>
            <p>This project is <a style={{color: 'black'}} target="_blank" href="https://github.com/jonathancai11/what-time-today">open source</a>.</p>
            <p>If you have any questions or concerns, feel free to email caimjonathan@gmail.com.</p>
        </div>

    )
}