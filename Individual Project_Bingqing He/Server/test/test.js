var mongoose = require("mongoose"),
User = require('../app/models/users');
ToDo = require('../app/models/todos');


//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencieslet 
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

//Test Users API
describe('User', () => {
        beforeEach((done) => { 
                User.remove({}, (err) => {done();
                });
        });
        //Perform the POST
        it('it should POST a user', (done) => {
                var user = {"firstName": "Jane","lastName": "Doe","email": "woo@hoo.com","password": "pass"}
                chai.request(server).post('/api/users').send(user).end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.have.property('firstName');
                        res.body.firstName.should.be.a('string');
                        res.body.firstName.should.equal('Jane');
                        done();
                });
        });
        //Testing POST with a missing required field
        it('it should not POST a user without email field', (done) => {
                var user = {"firstName": "Jane","lastName": "Doe","password": "pass"}
                chai.request(server).post('/api/users').send(user).end((err, res) => {
                        res.should.have.status(500);
                        done();
                });
        });
        //Testing the GET all users
        it('it should GET all the users', (done) => {    
                var user = new User({"firstName": "Jane","lastName": "Doe","email": "JaneDoe@hoo.com","password": "pass"    });    
                user.save((err, user) => {chai.request(server).get('/api/users').end((err, res) => {                
                        res.should.have.status(200);                
                        res.body.should.be.a('array');                
                        res.body.length.should.be.eql(1);                
                        done();            
                        });    
                });
        });
        //Testing GET for a user with _id
        it('it should GET a user by the given id', (done) => {
                var user = new User({"firstName": "Jane","lastName": "Doe","email": "JaneDoe@hoo.com","password": "pass"});
                user.save((err, user) => {chai.request(server).get('/api/users/' + user._id).send(user).end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('firstName');
                        res.body.should.have.property('lastName');
                        res.body.should.have.property('email');
                        res.body.should.have.property('password');
                        res.body.should.have.property('_id').eql(user._id.toString());
                        done();
                        });
                });
        });
        //Testing UPDATE
        it('it should UPDATE a user', (done) => {        
                var user = new User({"firstName": "Jane","lastName": "Doe", "email": "yoo@hoo.com", "password": "pass"});        
                user.save((err, user) => {chai.request(server).put('/api/users/' + user._id)
                .send({"_id": user._id,"firstName": "Joey","lastName": "Doe", "email": "yoo@hoo.edu", "password": "pass"})
                .end((err, res) => {                    
                        res.should.have.status(200);                    
                        res.body.should.be.a('object');                    
                        res.body.should.have.property('email').eql('yoo@hoo.edu');                    
                        res.body.should.have.property('firstName').eql('Joey');                    
                        done();                
                        });        
                });    
        });
        //Testing DELETE
        it('it should DELETE a user given the id', (done) => {        
                var user = new User({"firstName": "Jane","lastName": "Doe","email": "qive@hoo.com","password": "pass"});        
                user.save((err, user) => {chai.request(server).delete('/api/users/' + user.id).end((err, res) => {
                        res.should.have.status(200);  
                        done();                
                        });          
                });      
        });
});

//Testing ToDo API
var USER_ID;
describe('ToDo', () => {    
        beforeEach((done) => {         
                ToDo.remove({}, (err) => {            
                        done();        
                });    
        });    
                
var user = new User({"firstName": "Jane","lastName": "Doe","email": "JaneDoe@hoo.com","password": "pass"});    
user.save((err, user) => {USER_ID = user._id;});   
         //Test POST for ToDos
         it('it should POST a todo', (done) => {        
                var todo = {"userId": USER_ID,"todo": "This is my ToDo"}               
                chai.request(server).post('/api/todos').send(todo).end((err, res) => {                            
                        res.should.have.status(201);                
                        res.body.should.have.property('todo');                
                        res.body.todo.should.be.a('string');                
                        res.body.todo.should.equal('This is my ToDo');                
                        done();            
                });    
        });
        //Test GET a user’s ToDos
        it('it should GET a users todos', (done) => {        
                var todo = new ToDo({"userId": USER_ID,"todo": "This is my ToDo"})        
                todo.save((err, todo) => {chai.request(server).get('/api/todos/user/' + USER_ID).end((err, res) => {                                
                        res.should.have.status(200);                    
                        res.body.should.be.a('array');                    
                        res.body.length.should.be.eql(1);                    
                        done();                
                        });        
                });    
        });
        //Test GET a ToDo
        it('it should GET a todo', (done) => {        
                var todo = new ToDo({"userId": USER_ID,"todo": "This is my ToDo"})        
                todo.save((err, todo) => {chai.request(server).get('/api/todos/' + todo._id).end((err, res) => {                                
                        res.should.have.status(200);                    
                        res.body.should.be.a('object');                    
                        res.body.should.have.property('userId');                    
                        res.body.should.have.property('todo');                   
                        res.body.should.have.property('completed');                    
                        res.body.should.have.property('dateCreated');                    
                        res.body.should.have.property('_id').eql(todo._id.toString());                    
                        done();                
                        });        
                });    
        });
        //Test update a todo
        it('it should UPDATE a todo', (done) => {        
                var todo = new ToDo({"userId": USER_ID,"todo": "This is my ToDo","description": "This is a description"})
                todo.save((err, todo) => {chai.request(server).put('/api/todos/' + todo._id)
                .send({ "_id": todo._id,"userId": USER_ID,"todo": "Get it done!","description": "I don't need a description",}).end((err, res) => {                    
                        res.should.have.status(200);                    
                        res.body.should.be.a('object');                    
                        res.body.should.have.property('todo').eql('Get it done!');                    
                        res.body.should.have.property('description').eql("I don't need a description");                    
                        done();                
                        });        
                });    
        }); 
        //Test DELETE a ToDo
        it('it should DELETE a todo given the id', (done) => {        
                var todo = new ToDo({"userId": USER_ID,"todo": "This is my ToDo","description": "This is a description"})        
                todo.save((err, todo) => {chai.request(server).delete('/api/todos/' + todo.id).end((err, res) => {
                        res.should.have.status(200);
                        done();
                        });         
                });    
        });
        
});

