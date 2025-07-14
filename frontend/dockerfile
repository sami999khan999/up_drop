# Use official Node.js image
FROM node:24-alpine3.21

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json .
RUN npm install

# Copy frontend source
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in dev mode
CMD ["npm", "run", "dev"]
