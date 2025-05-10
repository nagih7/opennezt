# ***** KHI KHÔNG CÓ PACKAGE-LOCK.JSON *****
# BUILD STAGE
FROM node:20-alpine AS builder

WORKDIR /opennezt/backend

COPY package.json ./

RUN npm install

# RUN npm ci --only=production
# RUN npm install --only=development

COPY . .

RUN npm run build


# PRODUCTION STAGE
FROM node:20-alpine AS production

WORKDIR /opennezt/backend

ENV HOST=0.0.0.0
ENV NODE_ENV=production

COPY package.json ./

RUN npm install --only=production

COPY --from=builder /opennezt/backend/build ./build
COPY --from=builder /opennezt/backend/public ./public

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

# Make sure the app user owns the application files
RUN chown -R nodeuser:nodejs /opennezt/backend

# Switch to non-root user
USER nodeuser

# Set proper permissions
RUN mkdir -p /opennezt/backend/private/cache /opennezt/backend/private/logs && \
    chmod 755 /opennezt/backend/private/cache /opennezt/backend/private/logs

EXPOSE 3456

CMD ["node", "build/main.js"]

# ***** KHI CÓ PACKAGE-LOCK.JSON *****
# # BUILD STAGE
# FROM node:20-alpine AS builder

# WORKDIR /opennezt/backend

# COPY package*.json ./

# # RUN npm ci --only=production
# # RUN npm install --only=development

# COPY . .

# RUN npm run build


# # PRODUCTION STAGE
# FROM node:20-alpine AS production

# WORKDIR /opennezt/backend

# ENV NODE_ENV=production

# COPY package*.json ./

# RUN npm ci --only=production

# COPY --from=builder /opennezt/backend/build ./build
# COPY --from=builder /opennezt/backend/public ./public

# # Create non-root user for security
# RUN addgroup -g 1001 -S nodejs && \
#     adduser -S nodeuser -u 1001 -G nodejs

# # Make sure the app user owns the application files
# RUN chown -R nodeuser:nodejs /opennezt/backend

# # Switch to non-root user
# USER nodeuser

# # Set proper permissions
# RUN mkdir -p /opennezt/backend/private/cache /opennezt/backend/private/logs && \
#     chmod 755 /opennezt/backend/private/cache /opennezt/backend/private/logs

# EXPOSE 3456

# CMD ["node", "build/main.js"]


# docker build -t opennezt-backend .
# docker run -dp 3456:3456 --env-file .env opennezt-backend