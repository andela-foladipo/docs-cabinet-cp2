import supertest from 'supertest';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../app';

dotenv.config();

const request = supertest(app);
const loginEnpoint = '/api/users/login';

describe('When POST\'ed to, the /api/users/login endpoint', () => {
  const noUsernameNoPassword = {
    username: '',
    password: ''
  };
  it('should reject requests where the username and password are missing', (done) => {
    request.post(loginEnpoint)
      .send(noUsernameNoPassword)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'MissingLoginDetailsError'
      }, done);
  });

  const noUsername = {
    username: '',
    password: 'something'
  };
  it('should reject requests where the username is missing', (done) => {
    request.post(loginEnpoint)
      .send(noUsername)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'MissingUsernameError'
      }, done);
  });

  const noPassword = {
    username: 'foo@example.com',
    password: ''
  };
  it('should reject requests where the password is missing', (done) => {
    request.post(loginEnpoint)
      .send(noPassword)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'MissingPasswordError'
      }, done);
  });

  const invalidUsername = {
    username: 'foo@example',
    password: 'something'
  };
  it('should validate the username as a valid email address', (done) => {
    request.post(loginEnpoint)
      .send(invalidUsername)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'InvalidUsernameError'
      }, done);
  });

  const nonExistentUser = {
    username: 'nonexistent@user.com',
    password: 'something'
  };
  it('should reject login attempts for a non-existent user', (done) => {
    request.post(loginEnpoint)
      .send(nonExistentUser)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'NonExistentUserError'
      }, done);
  });

  const incorrectPassword = {
    username: 'foo@example.com',
    password: 'incorrectPassword'
  };
  it('should reject login attempts with an incorrect password', (done) => {
    request.post(loginEnpoint)
      .send(incorrectPassword)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .expect({
        error: 'IncorrectPasswordError'
      }, done);
  });

  const validLoginDetails = {
    username: 'foo@example.com',
    password: 'Very&&Hard$@'
  };
  const user = {
    userId: 0,
    roleId: 0,
    firstName: 'Lagbaja',
    lastName: 'Anonymous'
  };
  const token = JWT.sign(user, process.env.JWT_PRIVATE_KEY,
   { expiresIn: '3d' });
  it('should return a JWT token when the login details are correct', (done) => {
    request.post(loginEnpoint)
      .send(validLoginDetails)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({
        user,
        token
      }, done);
  });
});