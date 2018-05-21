import express from 'express';
import bodyParser from 'body-parser';
import { isNil } from 'ramda';

import { connection } from './db';
import { MOODS, FEELINGS } from './constants';

const defaultPort = process.env.PORT || 8080;

export const initServer = (options = {}) => {
  // create the app
  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.json({
      'check-in': `http://localhost:${options.port ||
        defaultPort}/api/check-in`,
    });
  });
  // setup routes
  app.post('/api/check-in', async (req, res) => {
    const { mood, feeling, comment } = req.body;
    if (isNil(mood) || isNil(feeling)) {
      return res.status(400).send({ err: '`mood` and `feeling` are required' });
    }
    if (!MOODS.find(x => x === mood)) {
      return res.status(400).send({
        err: `mood: '${mood}' is not valid. allowed values are: ${MOODS.join(
          ','
        )}`,
      });
    }
    if (!FEELINGS.find(x => x === feeling)) {
      return res.status(400).send({
        err: `feeling: '${feeling}' is not valid. allowed values are: ${FEELINGS.join(
          ','
        )}`,
      });
    }
    const ids = await connection('checkins').insert({
      mood,
      feeling,
      comment,
    });
    const results = await connection('checkins')
      .where({ id: ids[0] })
      .select(['mood', 'feeling', 'comment']);
    res.json(results[0]);
  });

  app.get('/api/check-in', async (req, res) => {
    const results = await connection('checkins').select([
      'mood',
      'feeling',
      'comment',
      'id',
      'created_at',
    ]);
    res.json(results);
  });

  // run the app
  const { port = defaultPort } = options;
  return app.listen(port, () =>
    console.info(`server started, listening on port ${port}`)
  );
};

export default initServer;
