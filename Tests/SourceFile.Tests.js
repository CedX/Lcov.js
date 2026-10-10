import {SourceFile} from "@cedx/lcov";

/**
 * Tests the features of the {@link SourceFile} class.
 */
describe("SourceFile", () => {
	context("toString()", () => {
		it("should return a format like 'SF:<path>\\nend_of_record'", () => {
			new SourceFile("").toString().should.equal("SF:\nend_of_record");

			const record = SourceFile.withCoverage("/home/CedX/Lcov.js");
			record.toString().should.equal(`SF:/home/CedX/Lcov.js\n${record.functions}\n${record.branches}\n${record.lines}\nend_of_record`);
		});
	});
});
