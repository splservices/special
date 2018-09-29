const path = require('path');
const fs = require('fs');
const moment = require('moment');
const logDirectory = path.join(__dirname, '..', 'logs');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

if (!fs.existsSync(logDirectory)) {
	fs.mkdirSync(logDirectory);
}

const myFormat = printf(info => {
	return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = createLogger({
	format: combine(label({ label: 'SERVER-LOG' }), timestamp(), myFormat),
	transports: [
		new DailyRotateFile({
			filename: path.join(logDirectory, 'error.%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			level: 'error',
			handleExceptions: true,
			humanReadableUnhandledException: true
		}),
		new DailyRotateFile({
			level: 'info',
			filename: path.join(logDirectory, 'combined.%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			handleExceptions: true,
			humanReadableUnhandledException: true
		}),
		new transports.Console({ colorize: true, handleExceptions: true, humanReadableUnhandledException: true })
	]
});

module.exports = logger;
const incoming = createLogger({
	format: combine(label({ label: 'INCOMING-REQUEST' }), timestamp(), myFormat),
	transports: [
		new transports.Console({ colorize: true, handleExceptions: true, humanReadableUnhandledException: true }),
		new DailyRotateFile({
			level: 'info',
			filename: path.join(logDirectory, 'incoming.%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			handleExceptions: true,
			humanReadableUnhandledException: true
		})
	]
});
const outgoing = createLogger({
	format: combine(label({ label: 'OUTGOING-REQUEST' }), timestamp(), myFormat),
	transports: [
		new transports.Console({ colorize: true, handleExceptions: true, humanReadableUnhandledException: true }),
		new DailyRotateFile({
			level: 'info',
			filename: path.join(logDirectory, 'outgoing.%DATE%.log'),
			datePattern: 'YYYY-MM-DD',
			handleExceptions: true,
			humanReadableUnhandledException: true
		})
	]
});
module.exports.incomingStream = {
	write: function(message, encoding) {
		incoming.info({ message: message.substring(0, message.lastIndexOf('\n')) });
	}
};
module.exports.outgoingStream = {
	write: function(message, encoding) {
		outgoing.info({ message: message.substring(0, message.lastIndexOf('\n')) });
	}
};
