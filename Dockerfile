FROM node:22-alpine AS base
RUN npm install -g pnpm@10.33.0
WORKDIR /app

FROM base AS development-dependencies-env
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS production-dependencies-env
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base AS build-env
# Injectée dans le bundle client par Vite : à passer au build
# (docker build --build-arg VITE_API_URL=https://…).
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . .
COPY --from=development-dependencies-env /app/node_modules ./node_modules
RUN pnpm build

FROM base
COPY package.json pnpm-lock.yaml ./
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
# Les articles MDX sont lus au runtime depuis content/blog.
COPY --from=build-env /app/content ./content
CMD ["pnpm", "start"]
