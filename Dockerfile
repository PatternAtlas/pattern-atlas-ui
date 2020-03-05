FROM node:12.2.0 as builder

RUN rm /dev/random && ln -s /dev/urandom /dev/random

WORKDIR /usr/angular-workdir
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./ /usr/angular-workdir
RUN npm install
RUN npm install -g @angular/cli@~9.0.0



RUN ng build

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
