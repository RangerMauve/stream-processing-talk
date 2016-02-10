var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;

var toCSV = require("csv-write-stream");
var fs = require("fs");

var map = require("through2-map").obj;
var filter = require("through2-filter").obj;

var timeDelta = require("time-delta");

var DB_URL = "mongodb://localhost:27017/streamdemo";

function processUsers(db) {
	var userData = db.collection("users")
		.find({})
		.pipe(filter(isOldEnough))
		.pipe(map(convertUser));

	userData
		.pipe(map(prettyPrint))
		.pipe(process.stdout);

	userData
		.pipe(toCSV({
			headers: ["name", "age"]
		}))
		.pipe(fs.createWriteStream("users.csv"), "utf8");
}

function convertUser(user) {
	return {
		name: user.first + user.last,
		age: user.age
	};
}

function prettyPrint(user) {
	return user.name + " is " + user.age + " years old";
}

function isOldEnough(user) {
	return user.age >= 18;
}
