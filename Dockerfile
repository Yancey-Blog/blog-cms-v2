FROM node:12-alpine as builder

LABEL com.yanceyleo.maintainer="Yancey Inc. <yanceyofficial@gmail.com>" \
    com.yanceyleo.version="1.0.0" \
    com.yanceyleo.release-date="2020-05-02"

WORKDIR /usr/src/cms

COPY . /usr/src/cms

RUN apk update && \
    apk add git

RUN yarn install

RUN yarn build


FROM node:12-alpine

WORKDIR /usr/src/cms

COPY --from=builder /usr/src/cms /usr/src/cms