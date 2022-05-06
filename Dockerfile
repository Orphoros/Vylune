FROM node:alpine as base

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["npm", "run", "start"]