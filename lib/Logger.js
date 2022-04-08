/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import LogLevel from "./LogLevel.js";

/**
 * An interface representing a log handler.
 *
 * @interface LogHandlerInterface
 */

/**
 * Log with an arbitrary level.
 *
 * @function
 * @name LogHandlerInterface#log
 * @param {LogLevel} level Log level.
 * @param {string} message Message to log.
 * @param {Object.<string, *>} context Context to render message in.
 */

/**
 * A logger instance only delegates all calls to its registered handlers.
 *
 * @implements {LogHandlerInterface}
 */
class Logger {
    /**
     * Create a new logger instance.
     *
     * @public
     * @param {Array.<LogHandlerInterface>} handlers Set of log handlers.
     */
    constructor(handlers) {
        /**
         * Set of log handlers.
         *
         * @private
         * @type {Array.<LogHandlerInterface>}
         */
        this.handlers = handlers;
    }

    /**
     * Log with an arbitrary level.
     *
     * @public
     * @param {LogLevel} level Log level.
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    log(level, message, context = {}) {
        this.handlers.forEach(handler => handler.log(level, message, context));
    }

    /**
     * System is unusable.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    emergency(message, context) {
        this.log(LogLevel.EMERGENCY, message, context);
    }

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    alert(message, context) {
        this.log(LogLevel.ALERT, message, context);
    }

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    critical(message, context) {
        this.log(LogLevel.CRITICAL, message, context);
    }

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    error(message, context) {
        this.log(LogLevel.ERROR, message, context);
    }

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesireble things
     * that are not necessarily wrong.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    warning(message, context) {
        this.log(LogLevel.WARNING, message, context);
    }

    /**
     * Normal but significant events.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    notice(message, context) {
        this.log(LogLevel.NOTICE, message, context);
    }

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    info(message, context) {
        this.log(LogLevel.INFO, message, context);
    }

    /**
     * Detailed debug information.
     *
     * @public
     * @param {string} message Message to log.
     * @param {Object.<string, *>} context Context to render message in.
     */
    debug(message, context) {
        this.log(LogLevel.DEBUG, message, context);
    }
}

export default Logger;
