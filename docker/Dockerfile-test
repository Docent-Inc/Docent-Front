FROM node:18.12.1 as builder

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN yarn install 

COPY . .
RUN yarn generate

FROM nginx:latest
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/.output/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]