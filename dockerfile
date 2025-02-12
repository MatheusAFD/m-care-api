FROM node:22-slim AS development

WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY package.json pnpm-lock.yaml .npmrc* ./

RUN apt-get update -y && apt-get install -y openssl && \
    npm install --global pnpm

RUN pnpm i

COPY . .

RUN pnpm db:generate

CMD ["pnpm", "start:dev"]
