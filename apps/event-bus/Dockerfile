# -------- Builder stage --------
FROM seniorigortyapkin/blog-base AS builder

WORKDIR /app
COPY . .

RUN npx nx build event-bus

# -------- Runtime stage --------
FROM node:24-alpine

WORKDIR /app

# Copy built code for event-bus
COPY --from=builder /app/apps/event-bus/dist ./dist
COPY --from=builder /app/apps/event-bus/package.json ./package.json

# Copy shared workspace package
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder /app/packages/shared/package.json ./packages/shared/package.json

# Copy node_modules from builder (contains all workspace deps incl. @org/shared)
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]
