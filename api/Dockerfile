# Light node image from github.com/mhart/alpine-node
FROM node:12.19

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 9000

CMD ["npm", "start"]