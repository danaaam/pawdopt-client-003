const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Replace these with your client ID and secret
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';

// Replace this with your refresh token
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oAuth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

async function createGoogleMeetLink(email) {
  const event = {
    summary: 'Monitoring Meeting',
    description: 'Meeting for monitoring purposes',
    start: {
      dateTime: '2024-06-23T09:00:00-07:00', // Replace with desired start time
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2024-06-23T10:00:00-07:00', // Replace with desired end time
      timeZone: 'America/Los_Angeles',
    },
    attendees: [{ email: email }],
    conferenceData: {
      createRequest: {
        requestId: 'sample123',
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  const response = await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1,
  });

  const meetLink = response.data.hangoutLink;
  return meetLink;
}

module.exports = { createGoogleMeetLink };
