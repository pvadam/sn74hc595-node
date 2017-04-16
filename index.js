var Gpio = require('/usr/bin/onoff-node/onoff.js').Gpio;

var clockPin = new Gpio(0, 'out');
var dataPin = new Gpio(1, 'out');
var applyPin = new Gpio(2, 'out');
var clearPin = new Gpio(3, 'out');

var writePin = (gpio, command) => {
  try {
    gpio.writeSync(command);
  } catch (e) {
    console.log(e);
  }
};

var sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

var addBinary = function (a, b) {
  var dec = Number(parseInt(a, 2)) + Number(parseInt(b, 2));
  return dec.toString(2);
};

var shift = (dataPin, clockPin, applyPin, command) => {
  writePin(dataPin, (command && Number(command)) || 0);
  writePin(clockPin, 1);
  return sleep(1)
    .then(() => writePin(clockPin, 0))
    .then(() => sleep(1))
    .then(() => applyPin && writePin(applyPin, 1))
    .then(() => sleep(1))
    .then(() => applyPin && writePin(applyPin, 0))
};

var shiftOut = (command, MSBFIRST) => {
  console.log(command);

  // antipattern for async for loop, sorry, I was too lazy..
  // instead use this pattern in production:
  // http://stackoverflow.com/questions/24660096/correct-way-to-write-loops-for-promise
  // and combining it with a bitwise shift operator would be a solution
  return shift(dataPin, clockPin, null, command[7])
    .then(() => shift(dataPin, clockPin, null, command[6]))
    .then(() => shift(dataPin, clockPin, null, command[5]))
    .then(() => shift(dataPin, clockPin, null, command[4]))
    .then(() => shift(dataPin, clockPin, null, command[3]))
    .then(() => shift(dataPin, clockPin, null, command[2]))
    .then(() => shift(dataPin, clockPin, null, command[1]))
    .then(() => shift(dataPin, clockPin, null, command[0]))
    .then(() => applyPin && sleep(1))
    .then(() => applyPin && writePin(applyPin, 1))
    .then(() => applyPin && sleep(1))
    .then(() => applyPin && writePin(applyPin, 0))
    .then(() => applyPin && sleep(1000));
};

var clear = () => {
  writePin(applyPin, 0);
  writePin(clearPin, 0);
  writePin(applyPin, 1);
  writePin(clearPin, 1);
};

var convertToBinaryArray = (decNumber) => {
  var bitarr = [];
  for (var i = 0; i < 8; ++i)
    bitarr[i] = (decNumber >> i) & 1;
  return bitarr;
};

var shiftNext = (output, MSBFIRST) => {
  if (output < 15) {
    output++;
  } else {
    output = 0;
  }
  return shiftOut(convertToBinaryArray(output))
    .then(() => shiftNext(output, MSBFIRST));
};

var simpleShifter = () => {
  writePin(clearPin, 1);
  writePin(applyPin, 0);

  return shift(dataPin, clockPin, applyPin, 1)
    .then(() => sleep(1000))
    .then(() => shift(dataPin, clockPin, applyPin, 1))
    .then(() => sleep(1000))
    .then(() => shift(dataPin, clockPin, applyPin, 0))
    .then(() => sleep(1000))
    .then(() => shift(dataPin, clockPin, applyPin, 1))
    .then(() => sleep(1000))
    .then(() => clear());
};

var decimalCounter = () => {
  writePin(clearPin, 1);
  writePin(applyPin, 0);

  return shiftNext(0);
};

try {
  console.log('start');

  simpleShifter()
    .then(() => console.log('decimal shifting'))
    .then(() => decimalCounter());
} catch (e) {
  console.log(e);
}
