SHELL := /usr/bin/env bash

# https://devcenter.heroku.com/articles/heroku-cli
.PHONY: heroku-setup
heroku-setup:
	heroku login
	heroku stack:set container -a $(APP)
	heroku addons:create heroku-postgresql:hobby-dev -a $(APP) || true

.PHONY: heroku-push
heroku-push:
	heroku container:login
	docker build -t registry.heroku.com/$(APP)/web .
	docker push registry.heroku.com/$(APP)/web
	heroku container:release web -a $(APP)