FROM node:19-alpine

WORKDIR /app

COPY . .

RUN npm install -g yo generator-awesome-list

USER node

CMD ["yo", "awesome-list"]
