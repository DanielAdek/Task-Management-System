# Use an official Node.js runtime as the base image
FROM node:18.15.0-alpine

LABEL authors="Daniel Adek"

# Set the working directory inside the container
WORKDIR /usr/src/notification-microservice

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install all the project dependencies
RUN yarn install

# Copy the rest of the application source code
COPY . .

# Define the default command to start the API gateway
CMD ["yarn", "start"]