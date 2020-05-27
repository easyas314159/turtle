FROM node:14.3-alpine AS build

COPY . /repo
WORKDIR /repo
RUN npm install && npm run build-prod

FROM nginx:alpine

LABEL maintainer="kevin.loney@gmail.com"

COPY --from=build /repo/build /usr/share/nginx/html
EXPOSE 80/tcp
