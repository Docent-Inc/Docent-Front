FROM node:18.12.1 as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN yarn install 

COPY . .
RUN yarn generate

FROM nginx:latest
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY /etc/letsencrypt/live/docent.zip/fullchain.pem  /etc/letsencrypt/live/docent.zip/fullchain.pem
COPY /etc/letsencrypt/live/docent.zip/privkey.pem  /etc/letsencrypt/live/docent.zip/privkey.pem

COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]