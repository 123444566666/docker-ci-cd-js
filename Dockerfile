# базовые настройки
FROM node:22-slim AS base

RUN npm install -g npm@11

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

# для разработки
FROM base AS dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# для прода
FROM base AS prod

COPY --chown=node:node . .

RUN npm run build && chown -R node:node /app

EXPOSE 3000

USER node

CMD ["npm", "start"]