FROM node:lts-alpine as build

WORKDIR /home/node/app

COPY . .

RUN npm ci && npm run build

# ---

FROM node:lts-alpine

WORKDIR /home/node/app

COPY --from=build /home/node/app/package*.json ./
COPY --from=build /home/node/app/node_modules ./node_modules/
COPY --from=build /home/node/app/dist/ ./dist/

ENTRYPOINT [ "node", "dist/src/main.js" ]
