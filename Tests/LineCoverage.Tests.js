import {LineCoverage, LineData} from "@cedx/lcov";
import "chai/register-should.js";

/**
 * Tests the features of the {@link LineCoverage} class.
 */
describe("LineCoverage", () => {
	context("toString()", () => {
		it("should return a format like 'LF:<found>\\nLH:<hit>'", () => {
			new LineCoverage().toString().should.equal("LF:0\nLH:0");

			const data = new LineData({executionCount: 3, lineNumber: 127});
			new LineCoverage({data: [data], found: 23, hit: 11}).toString().should.equal(`${data}\nLF:23\nLH:11`);
		});
	});
});

/**
 * Tests the features of the {@link LineData} class.
 */
describe("LineData", () => {
	context("toString()", () => {
		it("should return a format like 'DA:<lineNumber>,<executionCount>[,<checksum>]'", () => {
			new LineData().toString().should.equal("DA:0,0");

			const data = new LineData({checksum: "ed076287532e86365e841e92bfc50d8c", executionCount: 3, lineNumber: 127});
			data.toString().should.equal("DA:127,3,ed076287532e86365e841e92bfc50d8c");
		});
	});
});
