//DEPENDENCIES
const fs = require("fs")
const moment = require("moment")
const console = require("console")
const Console = require("console").Console

//PATH
//const LOGGER_FILE = "./logger.json"

//DATA
const LOGGER_FILE_DATA = {
    dateFormat: "YYYY-MM-DD THH:mm:ssZ",
    fileLogger: {
        fileInfo: "./app.log",
        fileError: "./apperr.log",
        log: true,
        error: true,
        warn: true,
        info: true
    },
    terminalLogger: {
        log: true,
        error: true,
        warn: true,
        info: true
    }
}
const COLORS = {
    RESET: "\x1b[0m",
    LOG: "\x1b[37m%s\x1b[1m",//white
    INFO: "\x1b[32m%s\x1b[1m",//green
    ERROR: "\x1b[31m%s\x1b[1m",// red "\x1b[5m" blink
    WARN: "\x1b[33m%s\x1b[1m"//black
}

//INIT
/* if (!fs.existsSync(LOGGER_FILE)) {
    fs.writeFileSync(
        LOGGER_FILE,
        JSON.stringify(LOGGER_FILE_DATA),
        "utf-8"
    )
} */

//CONFIURATION
//const conf = require(LOGGER_FILE)

let output = {}//fs.createWriteStream(LOGGER_FILE_DATA.fileLogger.fileInfo)
let errorOutput = {}//fs.createWriteStream(LOGGER_FILE_DATA.fileLogger.fileError)

let fileLogger = {}//new Console(output, errorOutput)
let terminalLogger = {}//new Console(process.stdout, process.stderr)

const doLog = function (mode) {
    return function () {
        if (LOGGER_FILE_DATA.terminalLogger[mode.toLowerCase()])
            terminalLogger[mode.toLowerCase()](
                COLORS[mode],
                moment().format(LOGGER_FILE_DATA.dateFormat),
                mode,
                ...arguments
            )
        else
            terminalLogger[mode.toLowerCase()](
                COLORS[mode],
                ...arguments
            )
        if (LOGGER_FILE_DATA.fileLogger[mode.toLowerCase()])
            fileLogger[mode.toLowerCase()](
                moment().format(LOGGER_FILE_DATA.dateFormat),
                mode,
                ...arguments
            )
        terminalLogger[mode.toLowerCase()](COLORS["RESET"])
    }
}

const doProgress = function () {
    return {
        start: function () {
            process.stdout.write("[")
        },
        update: function (number) {
            process.stdout.clearLine()
            process.stdout.cursorTo(0)
            process.stdout.write("[")
            for (let i = 0; i < number && i < 99; i++)
                process.stdout.write("=")
            process.stdout.write(">")
            for (let i = number; i < 100; i++)
                process.stdout.write(" ")
            process.stdout.write("]")
        },
        end: function (message = "done") {
            console.log(message)
        }
    }
}

console.log = doLog("LOG")
console.info = doLog("INFO")
console.error = doLog("ERROR")
console.warn = doLog("WARN")
console.progress = doProgress()


module.exports = function (options) {
    Object.assign(LOGGER_FILE_DATA, options)
    try {
        if (LOGGER_FILE_DATA.fileLogger && LOGGER_FILE_DATA.fileLogger.fileInfo)
            output = fs.createWriteStream(LOGGER_FILE_DATA.fileLogger.fileInfo)
        if (LOGGER_FILE_DATA.fileLogger && LOGGER_FILE_DATA.fileLogger.fileError)
            errorOutput = fs.createWriteStream(LOGGER_FILE_DATA.fileLogger.fileError)

        fileLogger = new Console(output, errorOutput)
    } catch (error) {
        console.error("[console-up]", error)
    }
    terminalLogger = new Console(process.stdout, process.stderr)
}