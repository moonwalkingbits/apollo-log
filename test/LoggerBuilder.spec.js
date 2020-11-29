/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { LogLevel, LoggerBuilder } from "@moonwalkingbits/apollo-log";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");
const { spy } = require("sinon");

describe("LoggerBuilder", () => {
    let loggerBuilder;
    let handlerSpy;

    beforeEach(() => {
        loggerBuilder = new LoggerBuilder();
        handlerSpy = spy({log: () => {}});
    });

    describe("#addHandler", () => {
        it("should add handler to the list of handlers", () => {
            loggerBuilder.addHandler(handlerSpy);

            loggerBuilder.build().log(LogLevel.INFO, "message");

            expect(handlerSpy.log.calledOnce);
        });

        it("should add multiple handlers", () => {
            const handlers = [
                spy({log: () => {}}),
                spy({log: () => {}}),
                spy({log: () => {}})
            ];

            handlers.forEach(loggerBuilder.addHandler.bind(loggerBuilder));

            loggerBuilder.build().log(LogLevel.INFO, "message");

            handlers.forEach(handler => {
                expect(handler.log.calledOnce);
            });
        });

        it("should return instance for method chaining", () => {
            expect(loggerBuilder).to.equal(loggerBuilder.addHandler(handlerSpy));
        });
    });

    describe("#build", () => {
        it("should create empty logger by default", () => {
            loggerBuilder.build().log(LogLevel.INFO, "should not throw");
        });
    });
});
