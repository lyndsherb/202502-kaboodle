FROM node:22-alpine

WORKDIR /api
COPY package*.json .
RUN ls -al
RUN npm ci
COPY . .
