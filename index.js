const colors = require('./colours/colors');
const emojis = require('./emojis/emojis');
const getTimestamp = require('./timestamp/timestamp');

// Default configuration for the logger.
let config = {
    time: false,
    emoji: false,
};

// Main function to configure and return the logger object.
const createLogger = (options = {}) => {
    config = { ...config, ...options };

    // Helper function to create a boxed message for "big text" logs.
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

    // Function to format the log message with optional timestamp and emoji.
    const formatMessage = (level, message) => {
        let prefix = "";
        if (config.time) {
            prefix += `[${getTimestamp()}] `;
        }
        if (config.emoji && emojis[level]) {
            prefix += `${emojis[level]} `;
        }
        return `${prefix}${message}`;
    };

    // The logger object with methods for different log levels and colors.
    const logger = {
        log: {
            info: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("info", message) + colors.reset);
                },
                red: (message) => {
                    console.log(colors.red + formatMessage("info", message) + colors.reset);
                },
                green: (message) => {
                    console.log(colors.green + formatMessage("info", message) + colors.reset);
                },
            },
            success: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("success", message) + colors.reset);
                },
                green: (message) => {
                    console.log(colors.green + formatMessage("success", message) + colors.reset);
                },
                yellow: (message) => {
                    console.log(colors.yellow + formatMessage("success", message) + colors.reset);
                },
            },
            error: {
                red: (message) => {
                    console.log(colors.red + formatMessage("error", message) + colors.reset);
                },
                magenta: (message) => {
                    console.log(colors.magenta + formatMessage("error", message) + colors.reset);
                },
            },
            warn: {
                yellow: (message) => {
                    console.log(colors.yellow + formatMessage("warn", message) + colors.reset);
                },
            },
            debug: {
                cyan: (message) => {
                    console.log(colors.cyan + formatMessage("debug", message) + colors.reset);
                },
            },
            // Extra emoji-powered log levels
            start: {
                green: (message) => {
                    console.log(colors.green + formatMessage("start", message) + colors.reset);
                },
            },
            stop: {
                red: (message) => {
                    console.log(colors.red + formatMessage("stop", message) + colors.reset);
                },
            },
            network: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("network", message) + colors.reset);
                },
            },
            db: {
                magenta: (message) => {
                    console.log(colors.magenta + formatMessage("db", message) + colors.reset);
                },
            },
            api: {
                cyan: (message) => {
                    console.log(colors.cyan + formatMessage("api", message) + colors.reset);
                },
            },
            cache: {
                yellow: (message) => {
                    console.log(colors.yellow + formatMessage("cache", message) + colors.reset);
                },
            },
            security: {
                red: (message) => {
                    console.log(colors.red + formatMessage("security", message) + colors.reset);
                },
            },
            unlock: {
                green: (message) => {
                    console.log(colors.green + formatMessage("unlock", message) + colors.reset);
                },
            },
            file: {
                white: (message) => {
                    console.log(colors.white + formatMessage("file", message) + colors.reset);
                },
            },
            folder: {
                cyan: (message) => {
                    console.log(colors.cyan + formatMessage("folder", message) + colors.reset);
                },
            },
            cloud: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("cloud", message) + colors.reset);
                },
            },
            robot: {
                magenta: (message) => {
                    console.log(colors.magenta + formatMessage("robot", message) + colors.reset);
                },
            },
            human: {
                green: (message) => {
                    console.log(colors.green + formatMessage("human", message) + colors.reset);
                },
            },
            idea: {
                yellow: (message) => {
                    console.log(colors.yellow + formatMessage("idea", message) + colors.reset);
                },
            },
            build: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("build", message) + colors.reset);
                },
            },
            test: {
                cyan: (message) => {
                    console.log(colors.cyan + formatMessage("test", message) + colors.reset);
                },
            },
            ship: {
                blue: (message) => {
                    console.log(colors.blue + formatMessage("ship", message) + colors.reset);
                },
            },
            bugFix: {
                green: (message) => {
                    console.log(colors.green + formatMessage("bugFix", message) + colors.reset);
                },
            },
        },
        // A new top-level method for creating a big, boxed log.
        bigLog: (level, color, message) => {
             console.log(createBoxedMessage(level, message, color));
        },
    };
    return logger;
};

// Export the logger creation function as the main entry point.
module.exports = createLogger;
