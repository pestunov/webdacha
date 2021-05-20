# Web Dacha
Board: Raspberry Pi (+WiFi)

Scripts kit to control IoT units at my latifundia. Get connections with units. Collect data from sensors, switch executives
**To do**
- [ ] DL, link environment states with user commands 



Units are based on ESP32, AVR (arduino), STM32 (Discovery)
* Climate insight Green House (GH)
* Pump switcher 
* GH Finestras open/close switcher
* Gate locker
* Gate open/close controller
* Perimeter security
There is another [repo](https://github.com/pestunov/domesticStick) for unit's code

This repo is in progress. Consists of modules for
* Data base module. Keep data about available/accesible remote units
  * Create patterns
  * Store units info (name, states, power status, nodes, category, etc)

* Connection module
  * UDP
  * RS232
  * onboard

* Datas pipe cyfer module
* Interface module
  * Web interface
```python
import flask
''' Using web interface '''
```
  * Telegram interface for free remote control

* Central module
  * Scheduler/user's tasks
  * Automotive
  * Direct command from Web, Telegram
  * DachaBrain (Based on DL/ML) ???
