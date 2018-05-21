FROM node:8.11.1-slim

# install yarn
RUN apt-get update \
    && apt-get install -y apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg \
    | apt-key add -

RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" \
    | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
    && apt-get install -y yarn \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock /app/
WORKDIR /app/
RUN yarn install --pure-lockfile

CMD npm start