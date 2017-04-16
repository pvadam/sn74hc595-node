# Using a SN74HC595 Shift Register with Node JS

This project is the first step towards using the SPI with Onion Omega 2. It does not yet use SPI, only controls the shift register by simple GPIO commands.

## Prerequisites on Omega 2

* Node JS (min. version: 4.0)

* Install Onoff Node

```sh
opkg update
opkg install onoff-node
```

## Running the project

1. Upload the `index.js` file to your Omega 2.

2. Run the Node application

```sh
node index.js
```

## Wiring

According to this wiring diagram.

![Wiring diagram for SN74HC595 with Omega 2+ using the Power Dock](https://raw.githubusercontent.com/pvadam/sn74hc595-node/master/images/Omega_SN74HC595.png)

## Read more
* [SN74HC595 data sheet](http://www.ti.com/lit/ds/symlink/sn74hc595.pdf)
* [Power dock spec](https://docs.onion.io/omega2-docs/power-dock.html)
* [Article on Bildr.org about the 74HC595](http://bildr.org/2011/02/74hc595/)

# Using a SN74HC595 Shift Register with SPI & Python

This is the next level using the shift register. This time we are controlling it with the Omega's SPI module.

## Prerequisites on Omega 2

* Python

* SPI Python Module

```sh
opkg update
opkg install python-light pyOnionSpi
```

* GPIO multiplexing setup properly

```sh
omega2-ctrl gpiomux set spi_cs1 spi_cs1
omega2-ctrl gpiomux set spi_s spi_s
# verifiy with the command below
omega2-ctrl gpiomux get
```

**Note:** You will not be able to use GPIO 6-9 as standard GPIOs until you set this back to GPIO mode. Read more [here](https://docs.onion.io/omega2-docs/using-gpios.html#using-gpios-multiplexing).

## Running the project

1. Upload the `index.py` file to your Omega 2.

2. Run the Python application

```sh
python index.py
```

## Wiring

According to this wiring diagram.

![Wiring diagram for SN74HC595 with Omega 2+ using the Power Dock with SPI](https://raw.githubusercontent.com/pvadam/sn74hc595-node/master/images/Omega_SN74HC595_SPI.png)

## Read more
* [SN74HC595 data sheet](http://www.ti.com/lit/ds/symlink/sn74hc595.pdf)
* [Power dock spec](https://docs.onion.io/omega2-docs/power-dock.html)
* [Multiplexed GPIOs](https://docs.onion.io/omega2-docs/using-gpios.html#using-gpios-multiplexing)
* [SPI Python Module](https://docs.onion.io/omega2-docs/spi-python-module.html)

# Cheat sheet

```sh
# Read the direction for pin 7
fast-gpio get-direction 7

# Read the value of pin 7
gpioctl get 7
# or
cat /sys/class/gpio/gpio7/value

# Set the value for pin 7 and the direction to `output`
fast-gpio set 7 0

# Read the multiplexing setup
omega2-ctrl gpiomux get
```