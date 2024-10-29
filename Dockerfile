FROM node:20.18 AS dev-deps
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM node:20.18 AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build


FROM nginx:1.25.5 AS prod
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD [ "nginx", "-g", "daemon off;" ]
