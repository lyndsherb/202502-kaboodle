FROM node:22-alpine

WORKDIR /api
COPY package*.json .
COPY tsconfig.json .
COPY src src
RUN mv src/data .
RUN npm ci
RUN npm run build
RUN rm -r src
RUN mv dist/* .
RUN rm -r dist

CMD ["node", "./index.js"]
