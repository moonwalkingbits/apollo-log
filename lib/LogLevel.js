/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Represents a fixed set of log levels.
 *
 * @readonly
 * @enum {string}
 */
const LogLevel = {
    /**
     * System is unusable.
     */
    EMERGENCY: "emergency",

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     */
    ALERT: "alert",

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     */
    CRITICAL: "critical",

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     */
    ERROR: "error",

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesireble things
     * that are not necessarily wrong.
     */
    WARNING: "warning",

    /**
     * Normal but significant events.
     */
    NOTICE: "notice",

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     */
    INFO: "info",

    /**
     * Detailed debug information.
     */
    DEBUG: "debug"
};

export default LogLevel;
