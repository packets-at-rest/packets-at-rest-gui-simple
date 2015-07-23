# Packets-At-REST-gui-simple

Packets-At-REST-gui-simple is a simple example for building a HTML front-end
for the [Packets at Rest](https://github.com/packets-at-rest/packets-at-rest) full packet capture system.

Packets-At-REST-gui-simple is designed to run from a single `Packets at Rest` `collector` server. It could be easily modified to be run from a remote webserver. 

![Screenshot](https://raw.githubusercontent.com/packets-at-rest/packets-at-rest-gui-simple/master/Screenshot.png)

## Setup Packets at Rest

Install and configure [Packets at Rest](https://github.com/packets-at-rest/packets-at-rest) collector and nodes using the instructions on github.

## Download this simple html gui
```
# Ensure you have Node.js, npm and bower installed
$> npm install bower

# Clone the repository
$> git clone https://github.com/packets-at-rest/packets-at-rest-gui-simple.git
$> cd packets-at-rest-gui-simple  

# Install dependencies  
$> bower-pull.sh
```

## Configure:

  * Map the location of this html static files to your nginx PAR head.
  * Modify the `js/sensors.js` file with the correct sensor mapping.

## Restart your web server:
```  
$> service nginx restart
```

$$ Profit $$
