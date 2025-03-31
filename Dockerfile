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
COPY --from=builder /app/dist ./dist

# RUN npm install ?
# CMD ["npm", "start"] ?