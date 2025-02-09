FROM node:22-alpine AS base

FROM base AS deps

WORKDIR /api
COPY package*.json tsconfig.json .
COPY src src
RUN \
    npm ci; \
    npm run build; \
    rm -r src; \
    mv dist/* .; \
    rm -r dist;

CMD ["node", "./index.js"]
