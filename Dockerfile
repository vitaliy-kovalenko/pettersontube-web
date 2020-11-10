FROM node:12-alpine

WORKDIR /srv

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

CMD yarn start
