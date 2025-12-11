# -------- Builder stage --------
FROM blog-base AS builder

# -------- Runtime stage --------
FROM node:24-alpine

WORKDIR /app

# Copy built code for comments
COPY --from=builder /app/apps/comments/dist ./dist

# Copy the service's own package.json so `npm start` exists
COPY --from=builder /app/apps/comments/package.json ./package.json

# Copy shared workspace package (needed for symlink resolution)
COPY --from=builder /app/packages/shared ./packages/shared

# Copy node_modules from builder (contains all workspace deps incl. @org/shared)
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "start"]
