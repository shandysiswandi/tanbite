FROM node:24-slim AS build
WORKDIR /app
ENV HUSKY=0
ENV PRERENDER=false
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:24-slim AS prod
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

FROM gcr.io/distroless/nodejs24-debian13:nonroot AS runtime-slim
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD [".output/server/index.mjs"]

FROM gcr.io/distroless/nodejs24-debian13:nonroot AS runtime-full
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app/.output .output
COPY --from=prod /app/package.json .
COPY --from=prod /app/node_modules ./node_modules
EXPOSE 3000
CMD [".output/server/index.mjs"]
