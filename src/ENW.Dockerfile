FROM node:8.12

ADD emailNotifier/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /src && cp -a /tmp/node_modules /src/
COPY emailNotifier/package.json /src/package.json
RUN cd /src; npm install
COPY ./emailNotifier /src/emailNotifier
COPY ./config /src/config

WORKDIR /src/emailNotifier
CMD ["node", "index.js"]