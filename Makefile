# This is a comment:

# The order in which I need the app to start up:
# Run the docker services for mongo.
# Run the docker services for express server
# Run the docker services for react app

mongo = containers
node-express = server
web-app = chat-app

run-docker-compose:
	@docker-compose up -d --build
stop-docker-compose:
	@docker-compose down

print:
	echo 'print'
hi:
	echo 'hi'
lol: print hi
	echo 'lol'
yo: print hi
	echo 'yo'
oh: lol yo
	echo 'oh'