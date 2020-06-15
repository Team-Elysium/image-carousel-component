#!/usr/bin/env bash

# Install MongoDB, Node.js and npm
printf "\n\n -------- Installing MongoDB, Node.js and npm -------- \n\n"
sudo apt update
sudo apt install -y mongodb nodejs npm

# Install npm Forever process manager module globally to run server
printf "\n\n -------- Installing Forever -------- \n\n"
sudo npm install forever -g

# Install npm dependencies
printf "\n\n -------- Installing Node Dependencies -------- \n\n"
rm package-lock.json
npm install

# Populate database with randomized real estate listing image links
printf "\n\n -------- Populating Database -------- \n\n"
node database/populate-database.js

# Run Webpack to Transpile React application
printf "\n\n -------- Bundling JS Client App -------- \n\n"
npm run-script build

# Make rc.local script executable and copy to /etc directory
# rc.local will run each time the server reboots
printf "\n\n -------- Copying rc.local script to /etc/rc.local -------- \n\n"
sudo chmod +x deployment/rc.local
sudo cp deployment/rc.local /etc

# Run rc.local to map port 80 to 3000, start MongoDB
# and Express.js web server using Forerver process manager
sudo /etc/rc.local

printf "\n\n -------- Setup Complete -------- \n\n"
echo " To view page, direct browser to a page with an id # from 0-99"
echo " http://public-domain.com/0 -> http://public-domain.com/99"