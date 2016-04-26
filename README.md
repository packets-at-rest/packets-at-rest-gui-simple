# Packets-At-REST-gui-simple

Packets-At-REST-gui-simple is a simple example for building a HTML front-end
for the [Packets at Rest](https://github.com/packets-at-rest/packets-at-rest) full packet capture system.

Packets-At-REST-gui-simple is designed to run from a single `Packets at Rest` `collector` server. It could be easily modified to be run from a remote webserver.

![Screenshot](https://raw.githubusercontent.com/packets-at-rest/packets-at-rest-gui-simple/master/Screenshot.png)

## Setup Packets at Rest

Install and configure [Packets at Rest](https://github.com/packets-at-rest/packets-at-rest) collector and nodes using the instructions on github.

## Download this simple html gui

### Clone the repository
```
$> git clone https://github.com/packets-at-rest/packets-at-rest-gui-simple.git
$> cd packets-at-rest-gui-simple  

```

### Configure:

Map the location of this html static files.
```
  # HTTPS server
  #
  server {
      listen       8443;
      server_name  hostname.localhost.local;

      ssl                  on;
      ssl_certificate      /etc/ssl/certs/hostname.localhost.local.crt;
      ssl_certificate_key  /etc/ssl/private/hostname.localhost.local.key;

      ssl_session_timeout  5m;

      ssl_prefer_server_ciphers on;
      ssl_session_cache shared:SSL:10m;
      ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
      ssl_ciphers 'EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH';

      # Note this config is for AJAX Uploads. Not POST.
      client_max_body_size 50M;

      root /opt/packets-at-rest-gui-simple/www;

  }
```
https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html

## Restart your web server:
```  
$> service nginx start
```

# Development Environment

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

# Modify the www/js directory

Add the collectors, and the nodes configuration for your environment.

$> cp www/js/collectors.js-sample www/js/collectors.js
$> cp www/js/nodes.js-sample www/js/nodes.js

# Run the sample `rackup` file for a simple server

You can use any rack based server puma/webbrick/thin etc.

$> puma

$$ Profit $$
