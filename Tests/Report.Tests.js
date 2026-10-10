import {BranchData, FunctionData, LineData, Report, SourceFile} from "@cedx/lcov";
import {readFileSync} from "fs";

/**
 * Tests the features of the {@link Report} class.
 */
describe("Report", () => {
	const coverage = readFileSync("Resources/Lcov.info", "utf8");

	context("parse()", () => {
		const report = Report.parse(coverage);
		it("should have a test name", () => report.testName.should.equal("Example"));

		it("should contain three source files", () => {
			report.sourceFiles.should.have.lengthOf(3);
			report.sourceFiles[0].should.be.an.instanceOf(SourceFile);
			report.sourceFiles[0].path.should.equal("/home/CedX/Lcov.js/Fixture.js");
			report.sourceFiles[1].path.should.equal("/home/CedX/Lcov.js/Func1.js");
			report.sourceFiles[2].path.should.equal("/home/CedX/Lcov.js/Func2.js");
		});

		it("should have detailed branch coverage", () => {
			const [, {branches}] = report.sourceFiles;
			should.exist(branches);

			const branchCoverage = /** @type {NonNullable<typeof branches>} */ (branches);
			branchCoverage.found.should.equal(4);
			branchCoverage.hit.should.equal(4);
			branchCoverage.data.should.have.lengthOf(4);

			const [data] = branchCoverage.data;
			data.should.be.an.instanceOf(BranchData);
			data.lineNumber.should.equal(8);
		});

		it("should have detailed function coverage", () => {
			const [, {functions}] = report.sourceFiles;
			should.exist(functions);

			const functionCoverage = /** @type {NonNullable<typeof functions>} */ (functions);
			functionCoverage.found.should.equal(1);
			functionCoverage.hit.should.equal(1);
			functionCoverage.data.should.have.lengthOf(1);

			const [data] = functionCoverage.data;
			data.should.be.an.instanceOf(FunctionData);
			data.functionName.should.equal("func1");
		});

		it("should have detailed line coverage", () => {
			const [, {lines}] = report.sourceFiles;
			should.exist(lines);

			const lineCoverage = /** @type {NonNullable<typeof lines>} */ (lines);
			lineCoverage.found.should.equal(9);
			lineCoverage.hit.should.equal(9);
			lineCoverage.data.should.have.lengthOf(9);

			const [data] = lineCoverage.data;
			data.should.be.an.instanceOf(LineData);
			data.checksum.should.equal("5kX7OTfHFcjnS98fjeVqNA");
		});

		it("should throw an error if the input is invalid", () => (() => Report.parse("ZZ")).should.throw(SyntaxError));
		it("should throw an error if the report is empty", () => (() => Report.parse("TN:Example")).should.throw(SyntaxError));
	});

	context("toString()", () => {
		it("should return a format like 'TN:<testName>'", () => {
			new Report("").toString().should.have.lengthOf(0);

			const sourceFile = new SourceFile("");
			new Report("LcovTest", [sourceFile]).toString().should.equal(`TN:LcovTest\n${sourceFile}`);
		});
	});

	context("tryParse()", () => {
		it("should return a `Report` if the parsing succeeded", () => {
			const report = Report.tryParse(coverage);
			should.exist(report);
			report?.should.be.an.instanceOf(Report);
		});

		it("should return `null` if the parsing failed", () => should.not.exist(Report.tryParse("TN:Example")));
	});
});
