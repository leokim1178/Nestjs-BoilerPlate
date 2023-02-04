FROM node:18-alpine


WORKDIR /nest/
RUN apk update
RUN apk upgrade
RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone
COPY ./package.json ./nest/package.json
COPY ./yarn.lock ./nest/yarn.lock
RUN yarn install
COPY . /nest/
ARG NODE_ENV
CMD yarn start:${NODE_ENV}
