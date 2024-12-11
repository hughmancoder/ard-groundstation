# Adept Rocketry Ground Station

<!-- ![ARD](groundstation_ui/public/logos/ARD_yellow_logo.png) -->
<img alt="Python" src="https://img.shields.io/badge/-Python-ffbc03?&logo=Python&style=for-the-badge" />
<img alt="Flask" src="https://img.shields.io/badge/-Flask-000000?&logo=Flask&style=for-the-badge" />
<img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?&logo=TypeScript&
style=for-the-badge" />
<img alt="React" src="https://img.shields.io/badge/-React-61DAFB?&logo=React&style=for-the-badge" />
<img alt="Arduino" src="https://img.shields.io/badge/-Arduino-00979D?&logo=Arduino&style=for-the-badge" />
<img alt="C" src="https://img.shields.io/badge/-C-A8B9CC?&logo=C&style=for-the-badge" />


## Installation

### Flask Server
```bash
cd groundstation
rm -rf myenv
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt
cd ..
```

### Frontend

```bash
cd groundstation_ui
npm install
cd ..
```

### Run the groundstation server

```make run_groundstation```

### Run the groundstation ui

```make run_groundstation_ui```

## Planned Features

- [ ] Teensy System Integration
- [ ] Add table
- [ ] Graphs page
- [ ] Export flight data to CSV
- [ ] More robust disconnect mechanism (disconnect regardless of connection failure)
- [ ] Clean up code and add hooks to seperate custom hook
- [ ] Database to save past flights
- [ ] Simulation Mode
- [ ] Concurrent guis through a distributed system

## Other

Free port 
lsof -i :5001