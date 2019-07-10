FROM node:10.16.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "." ]
CMD [ "npm", "test" ]
