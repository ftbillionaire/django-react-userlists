FROM node:13.12.0-alpine

WORKDIR /app/frontend

COPY package.json /app/frontend/
RUN npm install
RUN npm install webpack -g

COPY . /app/frontend/

