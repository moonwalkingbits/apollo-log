/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { expectAssignable } from "tsd";

import { LogHandlerInterface, LogLevel, Logger, LoggerBuilder, LoggerInterface, StreamHandler } from ".";

const handler = new StreamHandler(process.stdout);

expectAssignable<LogHandlerInterface>(handler);
handler.log(LogLevel.INFO, "");
handler.log(LogLevel.INFO, "", {});

const logger = new LoggerBuilder()
    .addHandler(handler)
    .build();

expectAssignable<Logger>(logger);
expectAssignable<LoggerInterface>(logger);
expectAssignable<LogHandlerInterface>(logger);
logger.log(LogLevel.INFO, "");
logger.log(LogLevel.INFO, "", {});
logger.emergency("");
logger.emergency("", {});
logger.alert("");
logger.alert("", {});
logger.critical("");
logger.critical("", {});
logger.error("");
logger.error("", {});
logger.warning("");
logger.warning("", {});
logger.notice("");
logger.notice("", {});
logger.info("");
logger.info("", {});
logger.debug("");
logger.debug("", {});
