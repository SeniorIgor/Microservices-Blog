# -------- Builder stage --------
FROM seniorigortyapkin/blog-base AS builder

WORKDIR /app
COPY . .

RUN npx nx build client

# -------- Runtime stage --------
FROM nginx:stable-alpine

# Copy built static files to NGINX HTML directory
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html

# Expose port 80 for Kubernetes Service
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
