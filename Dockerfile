FROM node:18-bookworm

RUN npm install -g npm@10.0.0

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install

COPY ./ /usr/app
RUN npm run vbuild

FROM nginx

WORKDIR /usr/app

COPY --from=0 /usr/app/dist /usr/share/nginx/html
