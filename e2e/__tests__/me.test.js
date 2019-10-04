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
    name: 'RevelStoke',
    location: 'British Columbia',
    elevation: '1'
  };

  const bob = {
    email: 'bob@bobross.com',
    password: 'pword',
    roles: 'student'
  };

  function postResort(resort, token) {
    console.log(token);
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

  it.only('gets a users favorite resort by Id', () => {
    return postUser(bob).then(person => {
      return postResort(skiResort, person.token).then(resort => {
        console.log(person, resort);
        return request
          .put(`/api/me/favorites/${resort._id}`)
          .set('Authorization', person.token)
          .send(person)
          .expect(200)
          .then(({ body }) => {
            expect(body[0]).toBe(resort._id);
          });
      });
    });
  });
 

  it('puts users favorite to set', () => {});

  it('deletes users favorite from set', () => {});
});
