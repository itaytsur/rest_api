
var chai = require('chai');
var chaiHttp = require('chai-htttp');
var app = require('../app');

var expect = chai.expect;

chai.use(chaiHttp);

describe('queue', () => {
  describe('enqueue', () => {
      it('should return back a json object with the first field being status: succeess, and the second object being the input to the enqueue api', (done) => {
          chai.request(app)
          .post('/api/queue')
          .send({
            "compilerOptions": {
                "target": "es5",
                "module": "commonjs",
                "sourceMap": true,
                "watch": false,
                "outDir": "./tsOutputs",
                "libs": ["dom", "es2017"]
            }
         })
          .end((err,res) => {
              if(err) done(err);
              expect(res).to.have.status(200);
              done();
          });
      });
  });

});


