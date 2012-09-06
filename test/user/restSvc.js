var should = require('should'),
  request = require("request");

describe('User REST Services', function() {

  //setup --------------------------------------
  beforeEach(function(done) {

    done();
  });

  //teardown --------------------------------------
  afterEach(function(done) {

    done();
  });


  it('try to get non-existing user, should fail', function(done) {

    request({
        method: "GET",
        uri: "http://localhost:8080/_rest/user/tim/"
      }, 
      function(err, response, body) {
        // feather.logger.debug({message: 'err is ' + err, immediately: true});
        // feather.logger.debug({message: 'response is ' + response, immediately: true});
        // feather.logger.debug({message: 'body is ' + body, immediately: true});
        // Sample response:
        //1|1|1|This transaction has been approved.|T723HO|Y|2162494894||speechtails.com authorization|1.00|CC|auth_only||Test|User||123 Main St|De Pere|WI|54115||||||||||||||||||4D8DC359797D987D1DD67B87CE36B2A9||2|||||||||||XXXX1111|Visa||||||||||||||||
        debugger;

        var userObject = JSON.parse(body);
        var emptyObject = {};

        userObject.should.have.property('message');
        userObject.message.should.match(/^User .* not found$/);
        response.should.have.status(500, 'Status code should be 500');

        done();
      }
    );



  });

});