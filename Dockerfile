FROM node:6.6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY src /usr/src/app/src
COPY package.json /usr/src/app
COPY npm-shrinkwrap.json /usr/src/app
COPY newrelic.js /usr/src/app

RUN npm install

ENV PORT=80
EXPOSE 80
CMD [ "npm", "start" ]
