FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 8000
