FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
    com.yanceyleo.version="1.0.0" \
    com.yanceyleo.release-date="2020-05-02"

WORKDIR /usr/src/cms

COPY package*.json ./

RUN apt install git

RUN yarn install

COPY . ./usr/src/cms

RUN yarn build

COPY . ./usr/src/cms