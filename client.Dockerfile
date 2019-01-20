FROM node:alpine

WORKDIR /frontend

COPY packages/client/package.json /frontend/package.json
COPY packages/client/yarn.lock /frontend/yarn.lock

RUN yarn install --production=false

ADD packages/client /frontend

RUN yarn build
