FROM node:alpine

WORKDIR /app
COPY package.json .

#To avoid installing mongo-db-inmemory
RUN npm install --omit=dev
COPY . .


CMD ["npm","start"]
