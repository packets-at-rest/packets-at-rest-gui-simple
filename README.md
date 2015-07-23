# Packets-At-REST-gui-simple

Packets-At-REST-gui-simple is a simple example for building a HTML front-end
for the Packets-at-REST system.

![About](https://raw.githubusercontent.com/packets-at-rest/packets-at-rest-gui-simple/master/Screenshot.png) [1]

## Setup PAR

Install packets-at-rest/packets-at-rest.

## Download this simple html gui
```
  $> git clone https://github.com/packets-at-rest/packets-at-rest-gui-simple.git
  $> bower-pull.sh
```

## Configure:

  * Map the location of this html static files to your nginx PAR head.
  * Modify the `js/sensors.js` file with the correct sensor mapping.

## Restart your web server:
```  
  restart nginx
```

$$ Profit $$
