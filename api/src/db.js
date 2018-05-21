import Knex from 'knex';
import Bookshelf from 'bookshelf';
import { any, isNil } from 'ramda';

const {
  DB_ENGINE = '',
  DB_HOST = '',
  DB_USER = '',
  DB_PASSWD = '',
  DB_DATABASE = '',
  DB_PORT = '',
} = process.env;

const required = { DB_ENGINE, DB_HOST, DB_USER, DB_DATABASE, DB_PORT };
if (any(x => x === '', required))
  throw new Error(
    'please make sure DB settings are specified as ENV vars (use .env file) ' +
      Object.keys(required)
        .map(key => `${key}:${required[key]}`)
        .join(', ')
  );

export const DATABASE_URL = `${DB_ENGINE}://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

export const connection = Knex({
  client: DB_ENGINE,
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWD,
    database: DB_DATABASE,
    charset: 'utf8',
    // use in memory db with sqlite3
    filename: DB_ENGINE === 'sqlite3' ? ':memory:' : undefined,
  },
  useNullAsDefault: DB_ENGINE === 'sqlite3',
  migrations: {
    tableName: 'migrations',
  },
});

export const testConnection = () => connection.raw('select 1');

export const createTables = async () => {
  try {
    await connection
      .select('*')
      .from('checkins')
      .limit(1);
    return true;
  } catch (e) {
    return connection.schema.createTable('checkins', table => {
      table.increments('id');
      table.json('feeling');
      table.enu('mood', ['1', '2', '3', '4', '5', '6', '7']);
      table.text('comment');
      table.timestamps(true, true);
    });
  }
};

// const ORM = Bookshelf(connection);
//
// const Checkin = orm.Model.extend({
//   tableName: 'checkin',
// });
//
// return { ORM, connection, models: { Checkin } };
