FROM node:13.12.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY ./public ./public/
COPY ./server ./server/
COPY ./index.js ./

EXPOSE 5678

CMD [ "node", "index.js" ]