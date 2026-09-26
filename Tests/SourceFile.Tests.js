import {SourceFile} from "@cedx/lcov";
import {equal} from "node:assert/strict";
import {describe, it} from "node:test";

/**
 * Tests the features of the {@link SourceFile} class.
 */
describe("SourceFile", () => {
	describe("toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			equal(String(new SourceFile("")), "SF:\nend_of_record");

			const record = SourceFile.withCoverage("/home/CedX/Lcov.js");
			equal(String(record), `SF:/home/CedX/Lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
