FROM node:alpine

WORKDIR /app
COPY package.json .

#To avoid installing mongo-db-inmemory
RUN npm install --only=prod
COPY . .


CMD ["npm","start"]
