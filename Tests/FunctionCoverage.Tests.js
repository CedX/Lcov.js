import {FunctionCoverage, FunctionData} from "@cedx/lcov";
import "chai/register-should.js";

/**
 * Tests the features of the {@link FunctionCoverage} class.
 */
describe("FunctionCoverage", () => {
	context("toString()", () => {
		it("should return a format like 'FNF:<found>\\nFNH:<hit>'", () => {
			new FunctionCoverage().toString().should.equal("FNF:0\nFNH:0");

			const data = new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127});
			new FunctionCoverage({data: [data], found: 23, hit: 11}).toString().should.equal(`${data}\nFNF:23\nFNH:11`);
		});
	});
});

/**
 * Tests the features of the {@link FunctionData} class.
 */
describe("FunctionData", () => {
	context("toString()", () => {
		it("should return a format like 'FN:<lineNumber>,<functionName>\\nFNDA:<executionCount>,<functionName>'", () => {
			new FunctionData().toString().should.equal("FN:0,\nFNDA:0,FOO");
			new FunctionData({executionCount: 3, functionName: "main", lineNumber: 127}).toString().should.equal("FN:127,main\nFNDA:3,main");
		});
	});
});
