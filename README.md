# Console-up

## Description
Some useful functionalities for your console

## Installation
npm install console-up

## Usage

```
require("console-up")({
    dateFormat: "YYYY-MM-DD THH:mm:ssZ",
    fileLogger: {
        fileInfo: "./myapp.log",
        fileError: "./myapperror.log",
        log: true,
        error: true,
        warn: true,
        info: true
    },
    terminalLogger: {
        log: false,
        error: true,
        warn: true,
        info: true
    }
})

//normal usage
console.log("hello") // hello
console.error("hello") // 2017-09-13 T11:04:08+02:00 ERROR hello

// Progress bar
console.progress.start() //[ ]
//then
console.progress.update(progressNumber) // [=>  ]
//...then
console.progress.update(progressNumber) // [==> ]
console.progress.end("Download Complete")
```