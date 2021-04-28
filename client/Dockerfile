# Light node image from github.com/mhart/alpine-node
FROM mhart/alpine-node:12

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY . /client/

EXPOSE 3000

CMD ["npm", "start"]