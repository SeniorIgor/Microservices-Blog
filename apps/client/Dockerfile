# -------- Builder stage --------
FROM base AS builder

WORKDIR /app

# Copy only the app + shared packages
COPY packages ./packages
COPY apps/client ./apps/client

# Build app using Nx
RUN npx nx build client

# -------- Runtime stage --------
FROM node:24-alpine

WORKDIR /app

# Copy built code for client
COPY --from=builder /app/apps/client/dist ./dist

# Copy the service's own package.json so `npm start` exists
COPY --from=builder /app/apps/client/package.json ./package.json

# Copy node_modules from builder (contains all workspace deps incl. @org/shared)
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]