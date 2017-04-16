import onionSpi
from time import sleep

### modify any SPI settings as required
spi  = onionSpi.OnionSpi(1, 32766)
spi.sck = 7
spi.mosi = 8
spi.miso = 9
spi.cs = 6

### register the device
spi.registerDevice()
spi.setupDevice()

### print the setup
print 'SPI CS GPIO:   %d'%(spi.cs)
print 'SPI SCK GPIO:  %d'%(spi.sck)
print 'SPI MISO GPIO: %d'%(spi.miso)
print 'SPI MOSI GPIO: %d'%(spi.mosi)

print 'SPI Speed: %d Hz (%d kHz)'%(spi.speed, spi.speed/1000)
print 'Mode: %d, Mode Bits: 0x%x, CS-High: %d'%(spi.mode, spi.modeBits, spi.csHigh)

print 'Check success %d'%(spi.checkDevice())

### start the loop
count = 0
while (count < 10):
  if count % 2 == 0:
    vals = [0b1111]
  else:
    vals = [0b0000]
  ret = spi.write(vals)
  sleep(0.5)

  print 'Flash count:', count
  count = count + 1

print 'Finished'
