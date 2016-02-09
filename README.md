# Stream Processing
![Waterfall](http://i313.photobucket.com/albums/ll367/boh_boho/Waterfall.gif)

## Definitions
### Sequential processing
- Doing one step at a time and blocking the next action before continuing to the next.
- Pulling all the data you need and processing it all at once

```javascript
var users = getUsersFromDB();

var averageAge = users.reduce(averageAges);

fs.writeFile("average.txt",averageAge);
```

### Stream processing
- Have data pushed to you from the source.
- Process data as it comes in

```javascript
getUsers()
    .pipe(reduceStream(averageAges))
    .pipe(fs.createWriteStream("average.txt"));
```

### Unix Pipes
- Programs written to do simple tasks and are composed via their STDIN/STDOUT

  ```bash
  ls | grep stream > streamstuff.txt
  ```

### Node.js Streams
- One of the main features of Node
- Totally neglected
- The main things that bring async processes to Node
- File IO is mostly just streams
- Network IO is just streams
- Waiting for data or outputting data is all non-blocking and done via streams

## How it works
### What sequential processing looks like
![Piano Falling](http://i.imgur.com/70pHR.gif)

### What streaming processing looks like
![Homer Eating](https://media.giphy.com/media/R4BMw5J3cir04/giphy.gif)

### Difference
- Not everything is processed at once
- Little chunks at a time, but at a fast rate

  ![Falling Candy](http://big.assets.huffingtonpost.com/candy_falling.gif)

### Advantages
- Less memory usage
- Won't stall on loading a large resource
- Concurrency becomes more simple and cheaper
- Efficient transfer since data can be sent over as it's retrieved
- Easy composability

  ![Happy Pikachu](https://media.giphy.com/media/6Q7KB17I9LNL2/giphy.gif)

### Disadvantages
- Sharing state between streams can be lead to a mess
- Not everything has a streaming API
- Implementing streaming and asynchronous APIs requires more thought

  ![Confused Eminem](https://media.giphy.com/media/vh9isNb4S2Spa/giphy.gif)

### On composability
- Single output, Single input, common interface
- Combining single purpose streams together
- Can switch sources and destinations easily
- Large existing ecosystem

## APIs
- Readable
- Writeable
- Duplex
- Transform

### Readable
- Represents a source of data
- File from disk
- HTTP response
- Results from a database query

![Pouring Honey](https://media.giphy.com/media/CrJ2kSB9hCkzS/giphy.gif)

### Writeable
### Duplex
### Transform
## Real world usage
Processing large amounts of data

![Spreadsheet](https://media.giphy.com/media/13vCYWYmBiuS8E/giphy.gif)
- Read DB users
- Filter unwanted ones
- Tansform data
- Pass to CSV generating stream
- Write CSV to file
- Also write to STDOUT
