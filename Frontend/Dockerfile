FROM node:12.18.1
ENV NODE_ENV=production

WORKDIR /app

RUN npm install --production
RUN npm install -g serve
COPY ./build .

EXPOSE 3000

CMD ["serve"]