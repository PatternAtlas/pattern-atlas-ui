FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN yarn --network-timeout 120000 && yarn build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
