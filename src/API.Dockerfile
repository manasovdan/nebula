FROM node:8.12

ADD api/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
COPY api/package.json /src/package.json
RUN cd /src; npm install
COPY ./api /src
COPY ./models /src
COPY ./config /src

WORKDIR /src/api
CMD ["node", "app.js"]