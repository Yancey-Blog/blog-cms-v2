FROM node:12-alpine as builder

WORKDIR /app

COPY ../blog-cms-v2 .

RUN npm install

RUN npm run build
