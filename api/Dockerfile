# Light node image from github.com/mhart/alpine-node
FROM node:12.19

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9000

CMD ["npm", "start"]