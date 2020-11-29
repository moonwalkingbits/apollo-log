/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * A stream implementation of a log handler.
 *
 * @implements {LogHandlerInterface}
 */
class StreamHandler {
    /**
     * Create a new handler instance.
     *
     * @public
     * @param {stream.Writable} stream Stream to write logs to.
     */
    constructor(stream) {
        /**
         * Stream to write logs to.
         *
         * @private
         * @type {stream.Writable}
         */
        this.stream = stream;
    }

    /**
     * Log with an arbitrary level.
     *
     * @public
     * @param {LogLevel} level Log level.
     * @param {string} message Message to log.
     * @param {Object.<string, *>} Context to render message in.
     */
    log(level, message, context = {}) {
        this.stream.write(`[${level}] ${this.interpolate(message, context)}\n`);
    }

    /**
     * Resolve and inject any context parameters into the message.
     *
     * @private
     * @param {string} message Message to render.
     * @param {Object.<string, *>} Context to extract parameters from.
     * @return {string} Rendered message with the context parameters injected.
     */
    interpolate(message, context) {
        for (let [ key, value ] of Object.entries(context)) {
            message = message.replace(`{${key}}`, value);
        }

        if (context.error) {
            message = `${context.error.name}: ${message}\n${context.error.stack.replace(/^.*\n([\s\S]*)$/, "$1")}`;
        }

        return message;
    }
}

export default StreamHandler;
