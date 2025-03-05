FROM node:22.14.0-alpine as base
WORKDIR /app
COPY package* .
RUN npm install --ignore-scripts
COPY . .
USER node
EXPOSE 3030
CMD ["node", "index.js"]