#!/bin/bash

# Navigate to the project directory
cd /home/ubuntu/websites/docukar-admin || exit

# Load NVM (Node Version Manager)
source /home/ubuntu/.nvm/nvm.sh

# Install Node.js dependencies
npm install

# Define the app name and path
APP_NAME="docukar-admin"

# Check if the PM2 process exists
if pm2 describe "$APP_NAME" > /dev/null; then
  echo "Restarting $APP_NAME..."
  pm2 restart "$APP_NAME" --update-env
else
  echo "Starting $APP_NAME..."
  pm2 start npm --name "$APP_NAME" -- run start
fi
