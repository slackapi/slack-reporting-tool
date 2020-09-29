FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT npm start

LABEL org.opencontainers.image.source https://github.com/slackapi/slack-reporting-tool

# docker run -p 3000:3000 -it slackapi/slack-reporting-tool --env-file ./.env