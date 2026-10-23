# базовые настройки
FROM node:22-slim AS base

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

# для разработки
FROM base AS dev

COPY . .

EXPOSE 3000

CMD ["npm" , "run" , "dev"]

# для прода
FROM base AS prod

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm" , "start" ]
