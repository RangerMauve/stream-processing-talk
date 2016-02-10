title: Stream Processing
output: index.html
theme: sudodoki/reveal-cleaver-theme

---
<style>
	img{text-align: center;}
	p{text-align: center;}
</style>

# Stream Processing
## by Georgiy Shibaev

![Waterfall](http://i313.photobucket.com/albums/ll367/boh_boho/Waterfall.gif)

---

## Terms

![Yawn](https://media.giphy.com/media/a9lgeWGF7Ysrm/giphy.gif)

---

### Sequential processing
- Doing one step at a time and blocking the next action before continuing to the next.
- Pulling all the data you need and processing it all at once

```javascript
var users = getUsersFromDB();

var averageAge = users.reduce(averageAges);

fs.writeFile("average.txt",averageAge);
```

---

### Stream processing
- Have data pushed to you from the source.
- Process data as it comes in

```javascript
getUsers()
    .pipe(reduceStream(averageAges))
    .pipe(fs.createWriteStream("average.txt"));
```

---

### Unix Pipes
- Programs written to do simple tasks and are composed via their STDIN/STDOUT

  ```bash
  ls | grep stream > streamstuff.txt
  ```

---

### Node.js Streams
- One of the main features of Node
- Totally neglected
- The main things that bring async processes to Node
- File IO is mostly just streams
- Network IO is just streams
- Waiting for data or outputting data is all non-blocking and done via streams

---

## How it works

![Confused face](https://media.giphy.com/media/JXZQIAy37ENJ6/giphy.gif)

---

### Sequential processing looks like
![Piano Falling](http://i.imgur.com/70pHR.gif)

---

### Streaming processing looks like
![Homer Eating](https://media.giphy.com/media/R4BMw5J3cir04/giphy.gif)

---

### Difference
- Not everything is processed at once
- Little chunks at a time, but at a fast rate

![Falling Candy](http://big.assets.huffingtonpost.com/candy_falling.gif)

---

### Advantages
- Less memory usage
- Won't stall on loading a large resource
- Concurrency becomes more simple and cheaper
- Efficient transfer since data can be sent over as it's retrieved
- Easy composability

![Happy Pikachu](https://media.giphy.com/media/6Q7KB17I9LNL2/giphy.gif)

---

### Disadvantages
- Sharing state between streams can be lead to a mess
- Not everything has a streaming API
- Implementing streaming and asynchronous APIs requires more thought

![Confused Eminem](https://media.giphy.com/media/vh9isNb4S2Spa/giphy.gif)

---

### On composability
- Single output, Single input, common interface
- Combining single purpose streams together
- Can switch sources and destinations easily
- Large existing ecosystem

![Lego bricks](https://media.giphy.com/media/d2ZhIkBvogTIzOik/giphy.gif)

---

## APIs
- Readable
- Writeable
- Duplex
- Transform
- Object mode

![Nodejs](https://nodejs.org/static/images/logos/nodejs.png)

---

### Readable
- Represents a source of data
- File from disk
- HTTP response from server
- Results from a database query

``` javascript
var Readable = require("stream").Readable;

var someSource = new Readable();
source._read = function(size){
	this.push("foo");
	this.push("bar");
	this.push(null);
}

someSource.pipe(process.stdout);
```

---

### Writeable
- Represents something data can flow into
- File to be written to disk
- HTTP request body to server

```javascript
var Writeable = require("stream").Writeable;

var someSink = new Writeable();
source._write = function(chunk, cb){
	console.log("Got data:", chunk);
	cb();
}
```

---

### Duplex
- Is both Readable and Writeable at the same time
- Represents a two sided connection
- TCP / Websockets

```javascript
var connection = require("net").connect({port: 123, host: "example.com"});

// Pipe incoming data back to the other side
connection.pipe(connection);
```

---

### Transform
- Special type of Duplex stream
- Readable side represents transformed data from writeable side
- Most processing is done here
- Mapping output from a DB query to an intermediate step

```javascript
var Transform = require("stream").Transform;
var streamify = require("stream-array");

var capitalizer = new Transform();
capitalizer._transform = function (chunk, cb) {
	cb(null,chunk.toUpperCase());
}
capitalizer._flush = function(cb){cb();}

streamify(["hello"," ","world","!"]).pipe(capitalizer).pipe(process.stdout);
```

---

### Object Mode
- Streams use buffers or strings by default
- Allows arbitrary objects to be passed through
- Useful for processing events

---


## Gotchas
- Errors don't get piped along with the data
- Encoding does matter
- Different stream versions exist

![Upset cat](https://media.giphy.com/media/ZH9MUTRHeLAaY/giphy.gif)

---

## Real world usage

<img title="Spreadsheet" height="200" src="https://media.giphy.com/media/13vCYWYmBiuS8E/giphy.gif">

- Read DB users
- Filter unwanted ones
- Tansform data
- Pass to CSV generating stream
- Write CSV to file
- Also write to STDOUT

---

## Resources

- [Node.JS docs](https://nodejs.org/api/stream.html#stream_class_stream_transform_1)
- [Stream Handbook](https://github.com/substack/stream-handbook)
- [NPM](https://www.npmjs.com/search?q=stream)
