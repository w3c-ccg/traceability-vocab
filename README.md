# Traceability Vocabulary Specification

![CI](https://github.com/w3c-ccg/traceability-vocab/workflows/CI/badge.svg) [![CD](https://github.com/w3c-ccg/traceability-vocab/actions/workflows/cd.yml/badge.svg)](https://github.com/w3c-ccg/traceability-vocab/actions/workflows/cd.yml)

## About

This specification describes a Linked Data vocabulary for asserting Verifiable
Credentials related to traceability information, such as chemical properties,
mechanical properties, country of origin, and other attributes used to determine
the status of products and materials in a supply chain.

We encourage contributions meeting the [Contribution
Guidelines](CONTRIBUTING.md). While we prefer the creation of issues and Pull
Requests in the GitHub repository, discussions often occur on the
[public-credentials](http://lists.w3.org/Archives/Public/public-credentials/)
mailing list as well, and at regular public meetings (see below).

## Meetings

Meetings are held

- Tuesdays at 1.30pm ET/10.30pm PT
- on jitsi using this link: [meet.w3c-ccg.org/traceability](https://meet.w3c-ccg.org/traceability)
- with standing agenda to review open [Pull Requests](https://github.com/w3c-ccg/traceability-vocab/pulls),
  then [open Issues](https://github.com/w3c-ccg/traceability-vocab/issues), unless otherwise noted on the mailing list

### Hosting instructions

Any chair, editor, or other party authorized by CCG to manage recordings and
minutes can do the following. A scribe-bot will show up in the main #ccg IRC
channel automatically.

1. Make sure to select "Start Recording" at the beginning of the call and "Stop
   Recording" when you're done.
2. Make sure to kick everyone out of the room when the meeting is done.
3. Once the last person leaves, everything else is automated (publishing raw IRC
   log, audio, and video). If you want to clean up the minutes, it takes about
   5-10 minutes to clean up the transcription and publish it.

#### Retrieving Minutes

1. Go to [Scribe tool](https://w3c-ccg.github.io/meetings/scribe-tool/)
2. Select "Traceability" from the drop-down at the bottom right.
3. Select a day for the call you're interested in.
4. Click "Retrieve Raw Logs".
5. The display will then render the minutes.

#### Publishing Minutes

[Publish Instructions](https://github.com/w3c-ccg/meetings#publish-the-minutes-for-ccg-meetings-task-forces-and-other-recorded-meetings)

### Development

```
npm i
npm run lint
npm run test
npm run build
npm run serve
```

See [DEVELOPMENT.md](./DEVELOPMENT.md)

