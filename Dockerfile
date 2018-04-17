FROM node:8

WORKDIR /home/node/app
COPY . /home/node/app

COPY package.json .

RUN npm install copyfiles -g
RUN npm install

ENV NODE_ENV production
ENV PORT $PORT

CMD ["make", "build", "start-prod"]
