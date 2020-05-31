FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN yarn
COPY . /usr/src/app
EXPOSE 3001
CMD ["yarn", "dev" ]
