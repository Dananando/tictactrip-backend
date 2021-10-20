const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();

chai.use(chaiHttp);

describe('User authentication, creation, deletion methods', () => {
  /**
   * POST - Enable user to sign up
   */
  describe('POST /api/signup', () => {
    it('It should create a new user and return an object containing its id and its mail', (done) => {
      chai.request(server)
        .post('/api/signup')
        .end((error, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
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
