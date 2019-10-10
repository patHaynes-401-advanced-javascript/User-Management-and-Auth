const request = require('../request');
const db = require('../db');

describe('Ski Resorts API', () => {
  beforeEach(() => db.dropCollection('users'));
  beforeEach(() => db.dropCollection('ski-resorts'));

  const skiResort = {
    name: 'Revel Stoke',
    location: 'British Columbia',
    lifts: 3,
    elevation: '5000'
  };

  const bob = {
    email: 'bob@bobross.com',
    password: 'pword',
    roles: 'student'
  };

  function postResort(resort, token) {
    return request
      .post('/api/ski-resorts')
      .set('Authorization', token)
      .send(resort)
      .expect(200)
      .then(({ body }) => body);
  }

  function postUser(user) {
    return request
      .post('/api/auth/signup')
      .send(user)
      .expect(200)
      .then(({ body }) => body);
  }

  it('puts users favorites into database', () => {
    return postUser(bob).then(person => {
      return postResort(skiResort, person.token).then(resort => {
        return request
          .put(`/api/me/favorites/${resort._id}`)
          .set('Authorization', person.token)
          .send(person)
          .expect(200)
          .then(({ body }) => {
            expect(body).toMatchInlineSnapshot(
              {
                _id: expect.any(String),
                favorites: expect.any(Array),
                hash: expect.any(String)
              },
              `
              Object {
                "__v": 0,
                "_id": Any<String>,
                "email": "bob@bobross.com",
                "favorites": Any<Array>,
                "hash": Any<String>,
                "roles": Array [
                  "student",
                ],
              }
            `
            );
          });
      });
    });
  });

  it('gets a users favorite', () => {
    return postUser(bob).then(person => {
      return postResort(skiResort, person.token).then(resort => {
        return request
          .put(`/api/me/favorites/${resort._id}`)
          .set('Authorization', person.token)
          .send(person)
          .expect(200)
          .then(() => {
            return request
              .get(`/api/me/${person._id}`)
              .set('Authorization', person.token)
              .then(res => {
                expect(res.body.favorites[0]).toMatchInlineSnapshot(
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
    });
  });

  it('deletes a users favorite', () => {
    return postUser(bob).then(person => {
      return postResort(skiResort, person.token).then(resort => {
        return request
          .put(`/api/me/favorites/${resort._id}`)
          .set('Authorization', person.token)
          .send(person)
          .expect(200)
          .then(() => {
            return request
              .get(`/api/me/${person._id}`)
              .set('Authorization', person.token)
              .then(() => {
                return request
                  .put(`/api/me/remove/${resort._id}`)
                  .set('Authorization', person.token)
                  .expect(200)
                  .then(res => {
                    expect(res.body).toMatchInlineSnapshot(
                      {
                        _id: expect.any(String),
                        hash: expect.any(String)
                      },
                      `
                      Object {
                        "__v": 0,
                        "_id": Any<String>,
                        "email": "bob@bobross.com",
                        "favorites": Array [],
                        "hash": Any<String>,
                        "roles": Array [
                          "student",
                        ],
                      }
                    `
                    );
                  });
              });
          });
      });
    });
  });
});
