FROM node:22-alpine

WORKDIR /events
COPY package*.json .
RUN npm ci
COPY . .

CMD [ "node", "./index.js" ]
