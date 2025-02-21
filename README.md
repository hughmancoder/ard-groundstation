# Adept Rocketry Ground Station

![ARD](gui/public/logos/ARD_yellow_logo.png)

## About

Welcome to Adept Rocketry Division's Groundstation. This repo consists of the GUI code and the embedded system code which resides on the teensy microcontroller.

## Getting Started

Our GUI reads from a serial port to get telemetry data from the rocket. The embedded system code sends telemetry data over the serial port. Information on how to set up the GUI and the embedded system can be found in the following READMEs

### GUI

[Gui README](gui/README.md)

![schematic](gui/public/demo/telemetry.png)

## Deployment

The gui is deployed to github pages so we don't have to run it from a terminal. It can be run manually by following the instructions in the gui README.

Deployment script in deployment.yml

```bash
# deploy manually 
cd gui
npm install gh-pages --save-dev
npm run deploy

# deploys automatically with github actions with git commits
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```



## Embedded systems

[Embedded README](embedded/README.md)

## Features

- [x] Real-time telemetry data
- [x] Graphs page
- [x] Settings page
- [ ] Deploy to github pages
- [ ] More robust disconnect mechanism (disconnect regardless of connection failure)
- [ ] Teensy System Integration
- [ ] Export flight data to CSV
- [ ] Database to save past flights
- [ ] Responsive UI (Gui can be used on phones/tablets)
