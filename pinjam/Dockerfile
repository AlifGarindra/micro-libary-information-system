FROM node:14-alpine
WORKDIR /src

COPY package.json /src

RUN npm install

COPY . /src

EXPOSE 3005

CMD ["npm","start"]