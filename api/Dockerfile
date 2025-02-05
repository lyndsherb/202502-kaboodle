FROM node:22-alpine

WORKDIR /api
COPY package*.json .
COPY src src
RUN npm ci
RUN npm run build
RUN rm -r src

CMD ["node", "dist/index.js"]
