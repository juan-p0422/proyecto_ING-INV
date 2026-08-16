FROM node:20-alpine AS frontend-build
WORKDIR /workspace/frontend
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/tsconfig*.json frontend/vite.config.ts frontend/index.html ./
COPY frontend/scripts ./scripts
COPY frontend/src ./src
RUN npm run build:obfuscated

FROM node:20-alpine AS backend-build
WORKDIR /workspace/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/tsconfig.json backend/prisma.config.ts ./
COPY backend/prisma ./prisma
COPY backend/src ./src
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS integrity-build
WORKDIR /workspace
COPY scripts/generate-checksum.js ./scripts/generate-checksum.js
COPY --from=backend-build /workspace/backend/dist ./backend/dist
COPY --from=frontend-build /workspace/frontend/dist ./frontend/dist
RUN node scripts/generate-checksum.js

FROM node:20-alpine AS runtime
WORKDIR /workspace/backend
ENV NODE_ENV=production
COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY backend/prisma.config.ts ./
COPY --from=backend-build /workspace/backend/dist ./dist
COPY --from=backend-build /workspace/backend/prisma ./prisma
COPY --from=backend-build /workspace/backend/node_modules/.prisma ./node_modules/.prisma
COPY --from=frontend-build /workspace/frontend/dist /workspace/frontend/dist
COPY --from=integrity-build /workspace/integrity-manifest.json /workspace/integrity-manifest.json
USER node
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
