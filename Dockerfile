# Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build



# Production
FROM node:20-alpine

WORKDIR /app

# Install a lightweight static file server
RUN npm install -g serve

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000 and serve the application
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]