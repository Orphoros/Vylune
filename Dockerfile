FROM node:alpine as base

WORKDIR /app

COPY . .

RUN npm i

CMD npm run start