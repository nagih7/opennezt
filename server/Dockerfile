# Multi-stage build for optimal production image
FROM node:20-alpine AS base

# Install system dependencies including curl for health checks
RUN apk add --no-cache \
    ffmpeg \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    curl \
    && rm -rf /var/cache/apk/*

# Tell Puppeteer to skip installing Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /opennezt/backend

# BUILD STAGE
FROM base AS builder

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --include=dev

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# PRODUCTION STAGE
FROM base AS production

WORKDIR /opennezt/backend

# Set environment variables
ENV HOST=0.0.0.0 \
    NODE_ENV=production \
    NPM_CONFIG_CACHE=/tmp/.npm

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy built application and public files from builder stage
COPY --from=builder /opennezt/backend/build ./build
COPY --from=builder /opennezt/backend/public ./public

# Create necessary directories with proper permissions
RUN mkdir -p /opennezt/backend/private/cache /opennezt/backend/private/logs && \
    chown -R nodeuser:nodejs /opennezt/backend && \
    chmod -R 755 /opennezt/backend/private

# Switch to non-root user
USER nodeuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3456/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

EXPOSE 3456

CMD ["node", "build/main.js"]
