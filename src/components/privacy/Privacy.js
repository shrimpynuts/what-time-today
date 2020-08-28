import React from 'react';

export default function Privacy() {
    return (
        <div className="not-homepage">
            <div className="privacy-page">
                <h2>User Data</h2>
                <p>Security and user data privacy is taken seriously.</p>
                <p>This application is run strictly client-side (in your browser), and thus, <b>all of the above are not stored in any database.</b></p>
                <p>Signing in through Google grants us access to your name, your email address, and your Google Calendar data.</p>
                <p>If you choose to sign in, your calendars are retrieved through the Google Calendar API and is only used to display on the home page.
                You may choose to revoke access to your Google Calendar data by signing out, and the data will be removed from your session.</p>
                <p>Also, the availabities that you select on the calendar only persist for your session and is not stored anywhere.</p>

                <h2>Third Parties</h2>
                <p>We use Google Analytics to track basic metrics about site performance and user acquisition.</p>
                <p><b>Other than that, your data will is not (and will never be) shared publicly or with any third party.</b></p>

                <h2>Other</h2>
                <p>This project is <a style={{ color: 'black' }} rel="noopener noreferrer" target="_blank" href="https://github.com/jonathancai11/what-time-today">open source</a>.</p>
                <p>If you have any questions or concerns, please email caimjonathan@gmail.com.</p>
            </div>
        </div>

    )
}