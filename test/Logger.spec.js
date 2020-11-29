/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Logger, LogLevel } from "@moonwalkingbits/apollo-log";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");
const { spy } = require("sinon");

function shouldBeCalledOnceWithParameters(spy, ...parameters) {
    expect(spy.calledOnce).to.be.true;

    for (let i = 0; i < parameters.length; i++) {
        expect(spy.getCall(0).args[i]).to.eql(parameters[i]);
    }
}

describe("Logger", () => {
    const message = "message";
    const context = {key: "value"};

    describe("#addHandler", () => {
        it("should add handler to list of log handlers", () => {
            const handlerSpy = spy({log: () => {}});
            const logger = new Logger([handlerSpy]);

            logger.log(LogLevel.INFO, message, context);

            shouldBeCalledOnceWithParameters(handlerSpy.log, LogLevel.INFO, message, context);
        });
    });

    describe("#log", () => {
        it("should not throw if no handlers", () => {
            new Logger([]).info("should not throw");
        });

        it("should delegate to all handlers", () => {
            const handlerOneSpy = spy({log: () => {}});
            const handlerTwoSpy = spy({log: () => {}});
            const logger = new Logger([handlerOneSpy, handlerTwoSpy]);

            logger.log(LogLevel.INFO, message, context);

            shouldBeCalledOnceWithParameters(handlerOneSpy.log, LogLevel.INFO, message, context);
            shouldBeCalledOnceWithParameters(handlerTwoSpy.log, LogLevel.INFO, message, context);
        });
    });

    describe("#emergency", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.emergency(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.EMERGENCY, message, context);
        });
    });

    describe("#alert", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.alert(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.ALERT, message, context);
        });
    });

    describe("#critical", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.critical(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.CRITICAL, message, context);
        });
    });

    describe("#error", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.error(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.ERROR, message, context);
        });
    });

    describe("#warning", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.warning(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.WARNING, message, context);
        });
    });

    describe("#notice", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.notice(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.NOTICE, message, context);
        });
    });

    describe("#info", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.info(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.INFO, message, context);
        });
    });

    describe("#debug", () => {
        it("should delegate to #log", () => {
            const logger = new Logger([]);
            const loggerSpy = spy(logger);

            logger.debug(message, context);

            shouldBeCalledOnceWithParameters(loggerSpy.log, LogLevel.DEBUG, message, context);
        });
    });
});
