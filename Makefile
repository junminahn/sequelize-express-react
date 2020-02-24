SHELL := /usr/bin/env bash

.PHONY: client-install
client-install:
	yarn --cwd ./client install

.PHONY: client
client:
	yarn --cwd ./client start

.PHONY: server-install
server-install:
	yarn --cwd ./server install

.PHONY: server
server:
	yarn --cwd ./server start
