FROM node:12.20.0
COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-p", "80", "build"]