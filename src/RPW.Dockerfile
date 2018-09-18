FROM node:8.12

ADD reviewProcessor/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
COPY reviewProcessor/package.json /src/package.json
RUN cd /src; npm install
WORKDIR /src
COPY ./reviewProcessor ./reviewProcessor
COPY ./models ./models
COPY ./config ./config

WORKDIR /src/reviewProcessor
CMD ["node", "index.js"]