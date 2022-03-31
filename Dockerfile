FROM node:14-alpine3.14 as node

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm config set strict-ssl "false"

RUN npm install --silent

#RUN npm install -g @angular/cli@12.0.0

COPY . /app

RUN npm run build

#stage 2
FROM nginx:latest

#RUN echo "server {listen 80;root /usr/share/nginx/html/subsidio;server_name _;location / {try_files $uri$args $uri$args/ /index.html; index  index.html index.htm;}}" > /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/subsidio /usr/share/nginx/html/subsidio
COPY /nginx.conf /etc/nginx/conf.d/default.conf

#COPY --from=node /app/dist/subsidio /var/www/nginx/html/subsidio
