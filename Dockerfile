FROM node:16-alpine3.16 as build

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the Angular app using npx (doesn't require global CLI installation)
RUN npx ng build --configuration production

# Production stage
FROM nginx:1.23.0-alpine

# Expose port 80 (nginx default) instead of 8080
EXPOSE 80

# Copy custom nginx config if it exists
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built Angular app
COPY --from=build /app/dist/xped8 /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
