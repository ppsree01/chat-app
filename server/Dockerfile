FROM node:12.20.0
COPY . .
RUN npm install
COPY .env.production .env
CMD ["node", "server.js"]