FROM node:20-alpine AS base
WORKDIR /app
# Instala dependencias del sistema necesarias (si se requieren)
RUN apk add --no-cache libc6-compat
# Copia manifests primero para cacheo de dependencias
COPY package*.json ./
# Instala dependencias prod + dev
RUN npm ci
# Copia el resto del código
COPY . .
# Compila
RUN npm run build
# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]