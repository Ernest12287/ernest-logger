const fs = require('fs');
const path = require('path');
const colors = require('./colours/colors');
const emojis = require('./emojis/emojis');
const getTimestamp = require('./timestamp/timestamp');

// Priority map for filtering logs
const levelPriority = {
    debug: 0,
    info: 1,
    success: 2,
    warn: 3,
    error: 4,
};

let config = {
    time: false,
    emoji: false,
    level: 'debug', // default: show all
    file: false,
    customLevels: {},
};

// Optional log file path
const logFilePath = path.join(__dirname, '../../ernest.log');

const createLogger = (options = {}) => {
    config = { ...config, ...options };

    const createBoxedMessage = (level, message, boxColor) => {
        const lines = message.split('\n');
        const maxLength = Math.max(...lines.map(line => line.length));
        const horizontalLine = '═'.repeat(maxLength + 2);

        let boxedMessage = colors[boxColor] + `╔${horizontalLine}╗\n`;
        boxedMessage += `║ ${emojis[level] || ''} ${' '.repeat(maxLength - (emojis[level] ? 2 : 0))}║\n`;

        lines.forEach(line => {
            const padding = ' '.repeat(maxLength - line.length);
            boxedMessage += `║ ${line}${padding} ║\n`;
        });

        boxedMessage += `╚${horizontalLine}╝` + colors.reset;
        return boxedMessage;
    };

    const formatMessage = (level, message) => {
        if (levelPriority[level] < levelPriority[config.level]) return null;

        let prefix = "";
        if (config.time) prefix += `[${getTimestamp()}] `;
        if (config.emoji && emojis[level]) prefix += `${emojis[level]} `;
        return `${prefix}${message}`;
    };

    const logToConsoleAndFile = (level, color, message) => {
        const formatted = formatMessage(level, message);
        if (!formatted) return;

        const output = colors[color] + formatted + colors.reset;
        console.log(output);

        if (config.file) {
            fs.appendFileSync(logFilePath, formatted + '\n');
        }
    };

    const logger = {
        log: {
            info: {
                blue: (msg) => logToConsoleAndFile("info", "blue", msg),
                red: (msg) => logToConsoleAndFile("info", "red", msg),
                green: (msg) => logToConsoleAndFile("info", "green", msg),
            },
            success: {
                blue: (msg) => logToConsoleAndFile("success", "blue", msg),
                green: (msg) => logToConsoleAndFile("success", "green", msg),
                yellow: (msg) => logToConsoleAndFile("success", "yellow", msg),
            },
            error: {
                red: (msg) => logToConsoleAndFile("error", "red", msg),
                magenta: (msg) => logToConsoleAndFile("error", "magenta", msg),
            },
            warn: {
                yellow: (msg) => logToConsoleAndFile("warn", "yellow", msg),
            },
            debug: {
                cyan: (msg) => logToConsoleAndFile("debug", "cyan", msg),
            },
            // ... (other predefined levels like start, stop, db, etc.)
        },

        bigLog: (level, color, message) => {
            console.log(createBoxedMessage(level, message, color));
            if (config.file) {
                fs.appendFileSync(logFilePath, `[BIG] ${message}\n`);
            }
        },
    };

    // Inject custom levels
    if (config.customLevels) {
        Object.entries(config.customLevels).forEach(([level, { color, emoji }]) => {
            emojis[level] = emoji;
            logger.log[level] = {
                [color]: (msg) => logToConsoleAndFile(level, color, msg),
            };
        });
    }

    return logger;
};

module.exports = createLogger;
