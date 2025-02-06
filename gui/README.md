# GUI

<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?&logo=TypeScript&style=for-the-badge" />
<img alt="React" src="https://img.shields.io/badge/-React-61DAFB?&logo=React&style=for-the-badge" />

## Setup

install npm and node on your machine

```bash
cd gui # if not already in the gui directory
npm install
npm run dev
```

## Overview

- The GUI is built using React, TypeScript and tailwind.css.
- The GUI reads from a serial port from the [Web Serial API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API) to get telemetry data from the groundstation.

- Important: check browser [compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility) for the Web Serial API

## Notes

List serial ports/

```javascript
# from browser console
navigator.serial.getPorts().then(ports => console.log(ports));
```

```bas
# from terminal
ls /dev/tty.*
```

## Simulate Serial Port

```bash
 socat -d -d pty,raw,echo=0 pty,raw,echo=0 # create serial port
 cd test
 python simulate_telemetry_serial.py
```
