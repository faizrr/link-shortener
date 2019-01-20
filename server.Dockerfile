FROM node:alpine

EXPOSE 3001
ENV NODE_ENV production
WORKDIR /server
CMD node -r ./tsconfig-paths-bootstrap.js dist/main.js

COPY packages/server/package.json /server/package.json
COPY packages/server/yarn.lock /server/yarn.lock

RUN yarn install --production=false

ADD packages/server /server

RUN yarn build
