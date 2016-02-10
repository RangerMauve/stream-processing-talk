title: Stream Processing
output: index.html

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

![Pouring Honey](https://media.giphy.com/media/CrJ2kSB9hCkzS/giphy.gif)

---

### Writeable
- Represents something data can flow into
- File to be written to disk
- HTTP request body to server

<img src="http://45.media.tumblr.com/4613680f27a611b0da38d737b0596a1f/tumblr_n9ns56gS4Y1qc66bjo1_500.gif" title="Sink whirlpool" height="300"/>

---

### Duplex
- Is both Readable and Writeable at the same time
- Represents a two sided connection
- TCP / Websockets

![Hampster in tube](https://media.giphy.com/media/hyZLXtoAYenCw/giphy.gif)

---

### Transform
- Special type of Duplex stream
- Readable side represents transformed data from writeable side
- Most processing is done here
- Mapping output from a DB query to an intermediate step

![Sailor Moon Transforming](https://media.giphy.com/media/YMJttfyUW9So/giphy.gif)

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
