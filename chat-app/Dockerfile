FROM node:16.13.1
COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "-p", "80", "build"]