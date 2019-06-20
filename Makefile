PATH  	 := node_modules/.bin:$(PATH)
SHELL    := /bin/bash

start-prod:
	node ./dist/server.js

lint:
	tslint --fix --project . 'src/**/*.ts'

start-watch:
	nodemon --watch src --ext js,ts,gql --exec make -- start

start:
	ts-node ./src/server

build:
	rm -rf ./dist && \
	mkdir -p dist && \
	copyup src/**/*.gql dist && \
	tsc

# heroku container:login
deploy:
	heroku container:push web
