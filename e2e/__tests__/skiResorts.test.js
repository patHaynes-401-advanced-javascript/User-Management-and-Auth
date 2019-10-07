const request = require('../request');
const db = require('../db');
const { signupUser } = require('../data-helpers');

describe('Ski Resorts API', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('ski-resorts'));

  let user = null;
  beforeEach(() => {
    return signupUser().then(newUser => (user = newUser));
  });

  const skiResort = {
    name: 'Revel Stoke',
    location: 'British Columbia',
    elevation: 5000,
    lifts: 3
  };

  function postResort(resort, token) {
    return request
      .post('/api/ski-resorts')
      .set('Authorization', token)
      .send(resort)
      .expect(200)
      .then(body => body.body);
  }

  it('posts a ski resort for this user', () => {
    return request
      .post('/api/ski-resorts')
      .set('Authorization', user.token)
      .send(skiResort)
      .expect(200)
      .then(({ body }) => {
        expect(body.owner).toBe(user._id);
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String),
            owner: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "elevation": 5000,
            "lifts": 3,
            "location": "British Columbia",
            "name": "Revel Stoke",
            "owner": Any<String>,
          }
        `
        );
      });
  });

  it.only('gets a list of ski resorts', () => {
    console.log('starting!');
    return Promise.all([
      postResort(skiResort, user.token),
      postResort(skiResort, user.token),
      postResort(skiResort, user.token)
    ]).then(() => {
      return request
        .get('/api/ski-resorts')
        .set('Authorization', user.token)
        .expect(200)
        .then(body => {
          expect(body.body[0]).toMatchInlineSnapshot(
            {
              _id: expect.any(String),
              owner: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "elevation": 5000,
              "lifts": 3,
              "location": "British Columbia",
              "name": "Revel Stoke",
              "owner": Any<String>,
            }
          `
          );
        });
    });
  });

  it.skip('deletes a ski resort', () => {});
});
