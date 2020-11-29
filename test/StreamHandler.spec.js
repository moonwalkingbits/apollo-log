/*
 * Copyright (c) 2020 Martin Pettersson
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { LogLevel, StreamHandler } from "@moonwalkingbits/apollo-log";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { expect } = require("chai");
const { spy } = require("sinon");

describe("StreamHandler", () => {
    let handler;
    let streamSpy;

    beforeEach(() => {
        streamSpy = spy({write: () => {}});
        handler = new StreamHandler(streamSpy);
    });

    describe("#log", () => {
        it("should write to the stream", () => {
            handler.log(LogLevel.INFO, "message");

            expect(streamSpy.write.calledOnce).to.be.true;
            expect(streamSpy.write.getCall(0).args[0]).to.be.a("string");
        });

        it("should format message with level prefix", () => {
            handler.log(LogLevel.INFO, "message");

            expect(streamSpy.write.getCall(0).args[0]).to.eql("[info] message\n");
        });

        it("should interpolate context values", () => {
            handler.log(
                LogLevel.INFO,
                "message {one} {two}",
                {
                    one: "parameter one",
                    two: "parameter two"
                }
            );

            expect(streamSpy.write.getCall(0).args[0]).to.eql(
                "[info] message parameter one parameter two\n"
            );
        });

        it("should leave unknown parameters as is", () => {
            handler.log(
                LogLevel.INFO,
                "message {one} {two}",
                {
                    one: "parameter one"
                }
            );

            expect(streamSpy.write.getCall(0).args[0]).to.eql(
                "[info] message parameter one {two}\n"
            );
        });

        it("should print stack trace if error parameter exists", () => {
            handler.log(
                LogLevel.INFO,
                "message",
                {
                    error: new Error()
                }
            );

            expect(streamSpy.write.getCall(0).args[0]).to.match(
                /^\[info\] Error: message(?=.+)/s
            );
        });
    });
});
