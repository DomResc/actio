# Dockerfile that clones the project from GitHub, builds and starts the server
FROM node:20-alpine

# Install git
RUN apk add --no-cache git

WORKDIR /app

# Clone the repository (change the URL if needed)
RUN git clone https://github.com/domresc/actio.git .

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the project
RUN pnpm run build

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
