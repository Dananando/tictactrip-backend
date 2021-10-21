const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('User signup, authentication, deletion methods', () => {
  /**
   * POST - Enable user to sign up
   */
  describe('POST /api/signup', () => {
    it('It should create a new user and return an object containing its mail', (done) => {
      const newUser = {
        email: 'test2@test.com',
        password: 'testpassword',
      };
      chai.request(server)
        .post('/v1/api/signup')
        .send(newUser)
        .end((_, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('email');
          response.body.should.have.property('id').eq(6);
          response.body.should.have.property('email').eq('test2@test.com');
          done();
        });
    });
  });

  /**
   * POST - Test authentication
   */

  /**
   * DELETE - Delete a user
   */
});
