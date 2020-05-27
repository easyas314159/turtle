FROM node:14.3-alpine AS build

COPY . /repo
WORKDIR /repo
RUN npm install && npm run build-prod

FROM python:3.7-alpine

WORKDIR /www
COPY --from=build /repo/build .
EXPOSE 8080/tcp

CMD python -m http.server 8080
