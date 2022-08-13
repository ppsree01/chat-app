# Run mongo, server, chat-app
CURDIR := $(shell pwd)
SERVER := server
CONTAINERS := containers
CHAT_APP := chat-app

DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_FILE := docker-compose.yml
STOP := stop
START := up -d --build

stop-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(SERVER)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(SERVER)/$(DOCKER_COMPOSE_FILE) $(START)
start-server-local:
	cd server && __DEV__=true nodemon server.js
stop-containers:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CONTAINERS)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-containers:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CONTAINERS)/$(DOCKER_COMPOSE_FILE) $(START)
stop-chat-app:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CHAT_APP)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-chat-app-local:
	cd chat-app && npm start
start-chat-app:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CHAT_APP)/$(DOCKER_COMPOSE_FILE) $(START)
docker-status:
	docker ps
start: start-containers start-server start-chat-app
start-server-local: start-containers start-server-local
stop: stop-containers stop-server stop-chat-app
restart: stop start docker-status
