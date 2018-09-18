FROM node:8.12

ADD api/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
COPY api/package.json /src/package.json
RUN cd /src; npm install
WORKDIR /src
COPY ./api ./api
COPY ./models ./models
COPY ./config ./config

WORKDIR /src/api
CMD ["node", "app.js"]