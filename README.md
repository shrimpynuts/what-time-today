# What time today?

Hate when people ask for your time availability?
Hate when a recruiter asks you for 1-2 hr time slots across the span of the next two weeks?

This is just a simple tool to help quickly summarize your time availability using easy drag-and-drop!

### Roadmap
Nothing! Not actively under development currently.

### Icebox
- [x] AM/PM Toggle
- [x] 24hr Toggle
- [x] Merging availabilities
- [x] Add "Tweet" button
- [ ] Switch to whichti.me domain?
- [ ] Google verification
- [ ] Add different availability types: Free, OOO, Busy, Busy (but could reschedule for right reason)
- [ ] Have 24hr toggle also change the times on the calendar
- [ ] Encode events into uri so you can send a URL and others can view your availability on the calendar
- [ ] How to button/instructions
- [ ] Home screen/landing page?
- [ ] Clean up crappy codebase
- [ ] Title/header that makes more sense
- [ ] More timezones

### Run locally:
(Needs a config.js file under src/util/config.js to supply Google API key and client id)
```
$ npm install
$ npm run dev
```

### Deploy:
```
$ npm run build
$ gcloud app deploy
```

### The works
React/redux, Google OAuth, Google Calendar API, react-big-calendar, moment.js
