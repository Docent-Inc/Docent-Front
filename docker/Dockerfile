FROM node:18.12.1 as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN yarn install 

COPY . .
RUN yarn generate

FROM nginx:latest
RUN mkdir /etc/
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/letsencrypt/live/docent.zip/fullchain.pem  /SSLKeys/fullchain.pem
COPY /etc/letsencrypt/live/docent.zip/privkey.pem  /SSLKeys/privkey.pem

COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]