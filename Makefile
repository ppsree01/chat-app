# Run mongo, server, chat-app
CURDIR := $(shell pwd)
SERVER := server
CONTAINERS := containers
CHAT_APP := chat-app

#STOP := docker-compose stop
#START := docker-compose up -d --build

# stop-server:
# 	$(STOP)
# 	cd $(CURDIR)/$(SERVER) && $(STOP)
# start-server:
# 	cd $(CURDIR)/$(SERVER) && $(START)
# stop-containers:
# 	cd $(CURDIR)/$(CONTAINERS) && $(STOP)
# start-containers:
# 	cd $(CURDIR)/$(CONTAINERS) && $(START)
# start-chat-app:
# 	cd $(CURDIR)/$(CHAT_APP) && $(START)
# stop-chat-app:
# 	cd $(CURDIR)/$(CHAT_APP) && $(STOP)
# start: start-containers start-server start-chat-app
# stop: stop-containers stop-server stop-chat-app

DOCKER_COMPOSE := docker-compose
DOCKER_COMPOSE_FILE := docker-compose.yml
STOP := stop
START := up -d --build
# SHOW_DOCKER_PS := docker ps

stop-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(SERVER)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-server:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(SERVER)/$(DOCKER_COMPOSE_FILE) $(START)
stop-containers:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CONTAINERS)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-containers:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CONTAINERS)/$(DOCKER_COMPOSE_FILE) $(START)
stop-chat-app:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CHAT_APP)/$(DOCKER_COMPOSE_FILE) $(STOP)
start-chat-app:
	$(DOCKER_COMPOSE) -f $(CURDIR)/$(CHAT_APP)/$(DOCKER_COMPOSE_FILE) $(START)
start: start-containers start-server start-chat-app
	docker ps
stop: stop-containers stop-server stop-chat-app
	docker ps 