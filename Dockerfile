FROM node:14.3-alpine

RUN npm install -g http-server

COPY . /sources
WORKDIR /sources
RUN npm install && npm run build-prod && mv build /www && rm -rf /sources

WORKDIR /www
EXPOSE 8080

CMD http-server --silent
