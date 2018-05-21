import { connection, testConnection, createTables } from './db';

it('should have a working test db connection', () => {
  return expect(async () => await testConnection()).not.toThrow();
});

it('should migrate ok', () => {
  return createTables().then(() => {
    return connection('checkins')
      .insert({
        mood: '1',
        feeling: 'happy',
        comment: 'test',
      })
      .then(ids =>
        connection('checkins')
          .where({ id: ids[0] })
          .select(['mood', 'feeling', 'comment'])
          .then(results => {
            expect(results[0].mood).toBe('1');
            expect(results[0].feeling).toBe('happy');
            expect(results[0].comment).toBe('test');
          })
      );
  });
});
