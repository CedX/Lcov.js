import {BranchCoverage, BranchData} from "@cedx/lcov";
import "chai/register-should.js";

/**
 * Tests the features of the {@link BranchCoverage} class.
 */
describe("BranchCoverage", () => {
	context("toString()", () => {
		it("should return a format like 'BRF:<found>\\nBRH:<hit>'", () => {
			new BranchCoverage().toString().should.equal("BRF:0\nBRH:0");

			const data = new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1});
			new BranchCoverage({data: [data], found: 23, hit: 11}).toString().should.equal(`${data}\nBRF:23\nBRH:11`);
		});
	});
});

/**
 * Tests the features of the {@link BranchData} class.
 */
describe("BranchData", () => {
	context("toString()", () => {
		it("should return a format like 'BRDA:<lineNumber>,<blockNumber>,<branchNumber>,<taken>'", () => {
			new BranchData().toString().should.equal("BRDA:0,0,0,-");
			new BranchData({blockNumber: 3, branchNumber: 2, lineNumber: 127, taken: 1}).toString().should.equal("BRDA:127,3,2,1");
		});
	});
});
