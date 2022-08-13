FROM node:16.13.1
COPY . .
RUN npm install
COPY .env.production .env
CMD ["node", "server.js"]