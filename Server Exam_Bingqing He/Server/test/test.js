//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose"),
Gadget = require('../app/models/yoohoo');



//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

it('it should GET the index.html file', (done) => {
    chai.request(server)
        .get('/index.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});

it('it should return 404', (done) => {
    chai.request(server)
        .get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});

describe('Gadget', () => {
    beforeEach((done) => {
        Gadget.remove({}, (err) => {
            done();
        });
    

//Get all Gadgets
it('it should GET all the gadgets', (done) => {
    var gadget = new Gadget({
        "Yoo": "Bingqing",
        "Hoo": 10
    });
    gadget.save((err, gadget) => {
        chai.request(server)
            .get('/api/gadgets')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});




//Delete a Gadget
it('it should DELETE gadget given the id', (done) => {
    var gadget = new Gadget({
        "Yoo": "Bingqing",
        "Hoo": 10
       
    });
    gadget.save((err, gadget) => {
        chai.request(server)
            .delete('/api/gadgets/' + gadget.id)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });

});
});
