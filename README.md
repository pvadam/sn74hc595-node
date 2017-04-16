# Using a SN74HC595 chip with Node JS

This project is the first step towards using the SPI with Onion Omega 2. It does not yet use SPI, only controls the shift register by simple GPIO commands.

## Prerequisites on Omega 2

* Node JS (min. version: 4.0)

* Install Onoff Node

```sh
opkg update
opkg install onoff-node
```

## Running the project

1. Upload the `index.js` file to your Omega.

2. Run the Node application

```sh
node index.js
```

## Wiring

According to this wiring diagram.

![Wiring diagram for SN74HC595 with Omega 2+ using the Power Dock](https://raw.githubusercontent.com/pvadam/sn74hc595-node/master/images/Omega_SN74HC595.png)
