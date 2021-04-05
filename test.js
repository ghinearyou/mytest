let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = require("chai").expect;
let server = "localhost:3000";
let faker = require("faker");

chai.use(chaiHttp);
let email = faker.internet.email(),
  password = faker.random.alpha()

describe("GET all users", () => {
  it("It should GET all users", done => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.status).to.equal('success')
          done()
        })
  })
})

describe("Register user", () => {
	it("it should POST a new user data", done => {
		const attribute = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      username: faker.internet.userName(),
      email,
      phone_number: faker.phone.phoneNumber(),
      password,
		};

		chai.request(server)
			.post("/register")
			.send(attribute)
			.end((err, res) => {
        expect(res.statusCode).to.equal(201)
				expect(res.body.status).to.equal('success')
				done()
			})
	})
})

describe("Login user", () => {
  it("It should Login as user", done => {
    const attribute = {
      email,
      password
    }
		chai.request(server)
        .post("/login")
        .send(attribute)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.status).to.equal('success')
          done()
        })
  })
})

