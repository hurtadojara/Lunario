FROM node:alpine
WORKDIR '/app'

COPY package.json .
RUN npm install client/
COPY . ..
CMD ["npm","start","client/"]

