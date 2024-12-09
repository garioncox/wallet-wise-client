FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json /app/
RUN npm install

RUN npm install -D vitest
RUN npm run test

COPY . .
RUN npm run build

#
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]