FROM --platform=linux/amd64 node:19-alpine3.16

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install
# RUN touch .env
# RUN echo WDS_SOCKET_PORT=443 > .env

COPY src src/
COPY public public/
COPY tsconfig.json .

RUN npm run build
RUN npm install serve -g

CMD ["serve", "-s", "build"]