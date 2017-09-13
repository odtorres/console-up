# Console-up

## Description
Some useful functionalities for your console

## Installation
npm install console-up

## Usage
```
require("./src/logger.js")({
    dateFormat: "YYYY-MM-DD THH:mm:ssZ",
    fileLogger: {
        fileInfo: "./my.log",
        fileError: "./apperr.log",
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

console.log("hello") // hello
console.error("hello") // 2017-09-13 T11:04:08+02:00 ERROR hello
```