/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Represents a fixed set of log levels.
 */
declare enum LogLevel {
    EMERGENCY = "emergency",
    ALERT = "alert",
    CRITICAL = "critical",
    ERROR = "error",
    WARNING = "warning",
    NOTICE = "notice",
    INFO = "info",
    DEBUG = "debug"
}

/**
 * An interface representing a log handler.
 */
declare interface LogHandlerInterface {
    /**
     * Log with an arbitrary level.
     *
     * @param level Log level.
     * @param message Message to log.
     * @param Context to render message in.
     */
    log(level: LogLevel, message: string, context?: {[key: string]: any}): void;
}

/**
 * An interface representing a logger.
 */
declare interface LoggerInterface {
    /**
     * Log with an arbitrary level.
     *
     * @param level Log level.
     * @param message Message to log.
     * @param Context to render message in.
     */
    log(level: LogLevel, message: string, context?: {[key: string]: any}): void;

    /**
     * System is unusable.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    emergency(message: string, context?: {[key: string]: any}): void;

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    alert(message: string, context?: {[key: string]: any}): void;

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    critical(message: string, context?: {[key: string]: any}): void;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    error(message: string, context?: {[key: string]: any}): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesireble things
     * that are not necessarily wrong.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    warning(message: string, context?: {[key: string]: any}): void;

    /**
     * Normal but significant events.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    notice(message: string, context?: {[key: string]: any}): void;

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    info(message: string, context?: {[key: string]: any}): void;

    /**
     * Detailed debug information.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    debug(message: string, context?: {[key: string]: any}): void;
}

/**
 * A logger instance only delegates all calls to its registered handlers.
 */
declare class Logger implements LogHandlerInterface, LoggerInterface {
    /**
     * Create a new logger instance.
     *
     * @param handlers Set of log handlers.
     */
    public constructor(handlers: Array<LogHandlerInterface>);

    /**
     * Log with an arbitrary level.
     *
     * @param level Log level.
     * @param message Message to log.
     * @param Context to render message in.
     */
    public log(level: LogLevel, message: string, context?: {[key: string]: any}): void;

    /**
     * System is unusable.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public emergency(message: string, context?: {[key: string]: any}): void;

    /**
     * Action must be taken immediately.
     *
     * Example: Entire website down, database unavailable, etc. This should
     * trigger the SMS alerts and wake you up.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public alert(message: string, context?: {[key: string]: any}): void;

    /**
     * Critical conditions.
     *
     * Example: Application component unavailable, unexpected exception.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public critical(message: string, context?: {[key: string]: any}): void;

    /**
     * Runtime errors that do not require immediate action but should typically
     * be logged and monitored.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public error(message: string, context?: {[key: string]: any}): void;

    /**
     * Exceptional occurrences that are not errors.
     *
     * Example: Use of deprecated APIs, poor use of an API, undesireble things
     * that are not necessarily wrong.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public warning(message: string, context?: {[key: string]: any}): void;

    /**
     * Normal but significant events.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public notice(message: string, context?: {[key: string]: any}): void;

    /**
     * Interesting events.
     *
     * Example: User logs in, SQL logs.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public info(message: string, context?: {[key: string]: any}): void;

    /**
     * Detailed debug information.
     *
     * @param message Message to log.
     * @param Context to render message in.
     */
    public debug(message: string, context?: {[key: string]: any}): void;
}

/**
 * A stream implementation of a log handler.
 */
declare class StreamHandler implements LogHandlerInterface {
    /**
     * Create a new handler instance.
     *
     * @param stream Stream to write logs to.
     */
    public constructor(stream: import("stream").Writable);

    /**
     * Log with an arbitrary level.
     *
     * @param level Log level.
     * @param message Message to log.
     * @param Context to render message in.
     */
    public log(level: LogLevel, message: string, context?: {[key: string]: any}): void;

}

/**
 * The logger builder abstracts the creation of a logger to allow participants
 * to add an arbitrary number of log handlers.
 */
declare class LoggerBuilder {
    /**
     * Create a new logger builder instance.
     */
    public constructor();

    /**
     * Add a log handler to the set of log delegates.
     *
     * @param handler Log handler to add.
     * @return The same instance for method chaining.
     */
    public addHandler(handler: LogHandlerInterface): this;

    /**
     * Build a logger instance with all registered log handlers.
     *
     * @return Logger instance with all registered log handlers.
     */
    public build(): Logger;
}

export {
    LogHandlerInterface,
    LogLevel,
    Logger,
    LoggerBuilder,
    LoggerInterface,
    StreamHandler
};
