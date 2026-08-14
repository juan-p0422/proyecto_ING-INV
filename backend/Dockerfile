FROM node:20-alpine AS build
WORKDIR /workspace/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/prisma ./prisma
COPY backend/src ./src
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /workspace/backend
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=build /workspace/backend/dist ./dist
COPY --from=build /workspace/backend/prisma ./prisma
COPY --from=build /workspace/backend/node_modules/.prisma ./node_modules/.prisma
COPY integrity-manifest.json /workspace/integrity-manifest.json
USER node
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
