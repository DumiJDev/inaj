FROM node:18-alpine

WORKDIR /opt/app

COPY . .

RUN npm build

CMD [ "node", "./build/index" ]