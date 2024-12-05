FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./
COPY apps ./apps
COPY packages ./packages

# install dependecies
RUN npm install
# add a script to the global package.json that does this?
RUN npm run db:generate

# filter the build down to just one app?
RUN npm run build

CMD ["npm" , "run" , "start-user-app"]