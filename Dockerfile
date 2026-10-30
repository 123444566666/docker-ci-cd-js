# базовые настройки
FROM node:22-slim AS base
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# для разработки
FROM base AS dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# сборка 
FROM base AS build
COPY . .
RUN npm run build

# для прода: чистый образ без npm
FROM node:22-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
COPY --from=build --chown=node:node /app /app
USER node
EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start"]