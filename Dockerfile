# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if exists) into the container
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your app's source code into the container
COPY . .

# Expose the port that your app will run on (default for HTTP is 8080)
EXPOSE 8080

# Run the application
CMD ["npm", "start"]
 
