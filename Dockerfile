# syntax=docker/dockerfile:1

# This Dockerfile is adapted and synthesized from:
#   1. https://github.com/vercel/next.js/tree/canary/examples/with-docker-compose/next-app (f54d597)
#   2. https://github.com/vercel/next.js/tree/canary/examples/with-docker (6aafef3)
#   3. https://github.com/docker/docs/tree/main/content/guides/nodejs (d4ce08a)

ARG NODE_VERSION=22

##################################################

FROM node:${NODE_VERSION}-alpine AS base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

##################################################

FROM node:${NODE_VERSION} AS dev

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .

# Next.js collects completely anonymous telemetry data about general usage
# Disable telemetry at development
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

##################################################

# Rebuild the source code only when needed
FROM base AS builder

# ARG ENV_VARIABLE
# ARG NEXT_PUBLIC_ENV_VARIABLE

# Install dependencies
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci

COPY . .

# Environment variables must be present at build time
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Next.js collects completely anonymous telemetry data about general usage
# Disable telemetry at build time
ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js
RUN npm run build

##################################################

# Production image, copy all the files and run next
FROM base AS runner

# ARG ENV_VARIABLE
# ARG NEXT_PUBLIC_ENV_VARIABLE

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV NODE_ENV=production

# Environment variables must be redefined at run time
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Next.js collects completely anonymous telemetry data about general usage
# Disable telemetry at run time
ENV NEXT_TELEMETRY_DISABLED=1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]
