# import onionSpi
import spi
# import signal
from time import sleep

### modify any SPI settings as required
dev='/dev/spidev0.0'
spd=1000000
spi.openSPI(device=dev,speed=spd)
# GPIO.setmode(GPIO.BOARD)

### start the loop
count = 0
while (count < 1000):
  vals = count

  ## uncomment this part for basic flashing (no counting)
  # if count % 2 == 0:
  #   vals = 0b1111
  # else:
  #   vals = 0b0000

  spi.transfer((0x00, vals))

  sleep(0.5)

  rdVal = spi.transfer((0x00, 0))
  print 'Read back (MISO - QH`): ', bin(rdVal[0]), rdVal[0]

  print 'Flash count:', count
  count = count + 1

print 'Finished'