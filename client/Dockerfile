# Light node image from github.com/mhart/alpine-node
FROM node:14.16-alpine

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# CMD ["npm", "start"]