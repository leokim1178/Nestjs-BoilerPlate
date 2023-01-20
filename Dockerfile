FROM node:18-alpine

WORKDIR /server/
RUN apk update
RUN apk upgrade
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone
COPY ./package.json /server/
COPY ./yarn.lock /server/
RUN yarn install
COPY . /server/
CMD yarn start:dev