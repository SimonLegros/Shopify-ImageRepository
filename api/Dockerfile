# Light node image from github.com/mhart/alpine-node
FROM mhart/alpine-node:12

WORKDIR /api

COPY package*.json /api/

RUN npm install

COPY . /api/

EXPOSE 80

CMD ["npm", "start"]