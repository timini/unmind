Getting Started
==

make sure you have docker and docker-compose installed then simply run:
`docker-compose up`

this will build a node docker image, install dependencies, build the javascript
and run the application.

Configuration
===
Set environment variables to configure the application e.g `PORT`, `NODE_ENV`, `DICTIONARY_PATH` etc.

This can be done in the docker-compose file but it is preferred that you use `.env` file

create `.env.local` for local overrides to the environment which will not be picked up by source control

Do not add secrets to `.env` as they will be commited to source control, instead add them to your local overrides - `.env.local`.

Tests
===

`npm test` to run the tests.
