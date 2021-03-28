# What time today?

[![HitCount](http://hits.dwyl.com/jonathancai11/what-time-today.svg)](http://hits.dwyl.com/jonathancai11/what-time-today)

Hate when people ask for your time availability?

Hate when a recruiter asks you for 1-2 hr time slots for an interview across the span of the next two weeks?!

To craft a response, with all of your available time slots, do you tab back and forth between your Google calendar and Gmail?!

And even when you send those times, do they tell you that none of them work and to send them more??!!

Do you not have the time/resources to use calendly, and would rather not do with the friction of when2meet and Doodle?

If so, this is just a simple tool to help you!

Just drag-and-drop!

![alt text](https://i.imgur.com/N4ANNsk.png)


If you have some feedback, feel free to put it [here](https://forms.gle/E83Y2mXJeLs9zLuJ7).

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
