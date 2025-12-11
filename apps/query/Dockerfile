# -------- Builder stage --------
FROM base AS builder

WORKDIR /app

# Copy only the app + shared packages
COPY packages ./packages
COPY apps/query ./apps/query

# Build app using Nx
RUN npx nx build query

# -------- Runtime stage --------
FROM node:24-alpine

WORKDIR /app

# Copy built code for query
COPY --from=builder /app/apps/query/dist ./dist

# Copy the service's own package.json so `npm start` exists
COPY --from=builder /app/apps/query/package.json ./package.json

# Copy shared workspace package (needed for symlink resolution)
COPY --from=builder /app/packages/shared ./packages/shared

# Copy node_modules from builder (contains all workspace deps incl. @org/shared)
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]
