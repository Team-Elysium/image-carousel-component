#!/usr/bin/env bash

# This script is to be run when deploying this component to a new Ubuntu 18.04 server
# instance once node, git and mongo have been installed.

# This script should be run as a superuser and it has not yet been tested, it is here for
# reference only.

# Map HTTP requests at external port 80 to internal node port 3010
echo "iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3010" >> /etc/rc.local

# Install node dependencies
rm package-lock.json
npm install

# Create a config file to store API key
echo "Please a enter MapBox API key:"
read API_KEY
echo "module.exports.MAPBOX_API_KEY = '$API_KEY';" > config.js

# Create the webpack bundle
npm run-script build

echo "Setup Complete: run the command 'sudo npm start' to start the server"