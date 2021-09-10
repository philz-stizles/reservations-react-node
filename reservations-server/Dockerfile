FROM node:alpine

WORKDIR /app

COPY package.json .
COPY tsconfig.json .
COPY src ./src

RUN ls -a

RUN npm install

RUN npm run build

## this is stage two , where the app actually runs
FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install --only=production
COPY --from=0 /app/dist .
RUN ls -a
RUN npm install pm2 -g
CMD pm2-runtime server.js