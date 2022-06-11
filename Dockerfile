FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache git

USER node
