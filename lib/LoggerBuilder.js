/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Logger from "./Logger.js";

/**
 * The logger builder abstracts the creation of a logger to allow participants
 * to add an arbitrary number of log handlers.
 */
class LoggerBuilder {
    /**
     * Create a new logger builder instance.
     *
     * @public
     */
    constructor() {
        /**
         * A list of log handlers.
         *
         * @private
         * @type {Array.<LogHandlerInterface>}
         */
        this.handlers = [];
    }

    /**
     * Add a log handler to the set of log delegates.
     *
     * @public
     * @param {LogHandlerInterface} handler Log handler to add.
     * @return {this} The same instance for method chaining.
     */
    addHandler(handler) {
        this.handlers.push(handler);

        return this;
    }

    /**
     * Build a logger instance with all registered log handlers.
     *
     * @public
     * @return {Logger} Logger instance with all registered log handlers.
     */
    build() {
        return new Logger(this.handlers);
    }
}

export default LoggerBuilder;
