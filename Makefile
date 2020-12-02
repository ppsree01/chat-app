# Run mongo, server, chat-app
CURDIR := $(shell pwd)
SERVER := server
CONTAINERS := containers
CHAT_APP := chat-app
STOP := docker-compose down --remove-orphans
START := docker-compose up -d --build

stop-server:
	cd $(CURDIR)/$(SERVER) && $(STOP)
start-server:
	cd $(CURDIR)/$(SERVER) && $(START)
stop-containers:
	cd $(CURDIR)/$(CONTAINERS) && $(STOP)
start-containers:
	cd $(CURDIR)/$(CONTAINERS) && $(START)
start-chat-app:
	cd $(CURDIR)/$(CHAT_APP) && $(START)
stop-chat-app:
	cd $(CURDIR)/$(CHAT_APP) && $(STOP)
start: start-containers start-server start-chat-app
stop: stop-containers stop-server stop-chat-app