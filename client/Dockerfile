# Use the official Node.js image to build the React app
FROM node:14 AS build

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the React app
FROM nginx:alpine

# Copy the build output to Nginx’s HTML directory
COPY --from=build client\build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
