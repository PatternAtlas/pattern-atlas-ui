FROM node:alpine AS builder

WORKDIR /app

COPY . .


RUN rm -rf node_modules package-lock.json && npm cache clean --force && npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/* /usr/share/nginx/html/
