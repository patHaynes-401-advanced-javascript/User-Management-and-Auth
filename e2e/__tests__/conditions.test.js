const request = require('../request');
const { dropCollection } = require('../db');
const { signupUser } = require('../data-helpers');
const User = require('../../lib/models/user');

describe('Ski Resort Conditions', () => {
  beforeEach(() => dropCollection('users'));
  beforeEach(() => dropCollection('conditions'));

  const snowConditionOne = {
    condition: 'snowing',
    snowfall: 12
  };

  const snowConditionTwo = {
    condition: 'blue bird',
    snowfall: 0
  };

  const adminPerson = {
    email: 'admin@snow.com',
    password: 'abc123'
  };

  const bob = {
    email: 'bob@bobross.com',
    password: 'pword'
  };

  function singinAdminUser(admin = adminPerson) {
    return request
      .post('/api/auth/signin')
      .send(admin)
      .expect(200)
      .then(({ body }) => body);
  }

  function postCondition(condition = snowConditionTwo) {
    return request
      .post('/api/snow-conditions')
      .set('Authorization', adminToken)
      .send(condition)
      .expect(200)
      .then(({ body }) => body);
  }

  let adminToken;
  let userToken;

  beforeEach(() => {
    return signupUser(adminPerson)
      .then(user => {
        return User.updateById(user._id, {
          $push: {
            roles: 'admin'
          }
        }).then(() => {
          return request
            .post('/api/auth/signin')
            .send(adminPerson)
            .then(body => {
              adminToken = body.body.token;
            });
        });
      })
      .then(() => {
        return User.find().then(() => {});
      });
  });

  beforeEach(() => {
    return signupUser(bob).then(user => {
      userToken = user.token;
    });
  });

  it('posts ski conditions with users permission', () => {
    return request
      .post('/api/snow-conditions')
      .set('Authorization', adminToken)
      .send(snowConditionOne)
      .expect(200)
      .then(({ body }) => {
        expect(body).toMatchInlineSnapshot(
          {
            _id: expect.any(String)
          },
          `
          Object {
            "__v": 0,
            "_id": Any<String>,
            "condition": "snowing",
            "snowfall": 12,
          }
        `
        );
      });
  });

  it('denies someone without user permission to post', () => {
    return request
      .post('/api/snow-conditions')
      .set('Authorization', userToken)
      .send(snowConditionOne)
      .expect(400);
  });

  it('only allows puts by admin', () => {
    return postCondition(snowConditionTwo).then(condition => {
      return request
        .put(`/api/snow-conditions/${condition._id}`)
        .set('Authorization', adminToken)
        .send({
          condition: 'blue bird'
        })
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchInlineSnapshot(
            {
              _id: expect.any(String)
            },
            `
            Object {
              "__v": 0,
              "_id": Any<String>,
              "condition": "blue bird",
              "snowfall": 0,
            }
          `
          );
        });
    });
  });
});
