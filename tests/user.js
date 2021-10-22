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
        email: 'lili@andria.com',
        password: 'password',
      };
      chai.request(server)
        .post('/v1/api/signup')
        .send(newUser)
        .end((_, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('email');
          response.body.should.have.property('id').eq(2);
          response.body.should.have.property('email').eq('lili@andria.com');
          done();
        });
    });
  });

  /**
   * POST - Test authentication
   */
   describe('POST /api/token', () => {
    it('It should authenticate a user and return a token', (done) => {
      const userToAuthenticate = {
        email: 'lili@andria.com',
        password: 'password',
      };
      chai.request(server)
        .post('/v1/api/token')
        .send(userToAuthenticate)
        .end((_, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('logged');
          response.body.should.have.property('id');
          response.body.should.have.property('email').eq('lili@andria.com');
          done();
        });
    });
  });

  /**
   * DELETE - Delete a user
   */
   describe('DELETE /api/user/:id', () => {
    it('It should delete a user and return its former id', (done) => {
      const id = 2;
      chai.request(server)
        .delete(`/v1/api/user/${id}`)
        .end((_, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          response.body.should.have.property('id').eq(2);
          done();
        });
    });
  });
});
