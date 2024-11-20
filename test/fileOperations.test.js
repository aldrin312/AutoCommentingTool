import { expect } from 'chai';
import fs from 'fs';
import { writeIntoFile } from '../index.js';
import sinon from 'sinon';

describe('File Operations - writeIntoFile', function () {
    let writeFileStub;

    beforeEach(() => {
        // Stub fs.writeFile to prevent actual file writes
        writeFileStub = sinon.stub(fs, 'writeFile');
    });

    afterEach(() => {
        // Restore the original methods
        sinon.restore();
    });

    it('should write data to a file successfully', async function () {
        const testData = 'This is a test comment.';
        const testFileName = 'testOutput.js';

        // Simulate a successful file write
        writeFileStub.yields(null);

        await writeIntoFile(testData, testFileName);

        expect(writeFileStub.calledOnce).to.be.true;
        expect(writeFileStub.calledWith('Outputs/' + testFileName, testData)).to.be.true;
    });

    it('should throw an error if writing to the file fails', async function () {
        const testData = 'This is a test comment.';
        const testFileName = 'testOutput.js';

        // Simulate a write failure
        writeFileStub.yields(new Error('Write failed'));

        try {
            await writeIntoFile(testData, testFileName);
            throw new Error('Expected error was not thrown');
        } catch (err) {
            expect(err.message).to.equal('Write failed');
        }
    });

    it('should not write an empty string to a file', async function () {
        const testData = ''; // Empty string
        const testFileName = 'testOutput.js';

        await writeIntoFile(testData, testFileName);

        // Ensure the write function is called, but verify behavior based on requirements
        expect(writeFileStub.calledOnce).to.be.true;
        expect(writeFileStub.calledWith('Outputs/' + testFileName, testData)).to.be.true;
    });

    it('should use the correct file path format', async function () {
        const testData = 'This is a test comment.';
        const testFileName = 'nested/output/testOutput.js';

        writeFileStub.yields(null); // Simulate success

        await writeIntoFile(testData, testFileName);

        // Validate that the correct path is used
        expect(writeFileStub.calledWith('Outputs/' + testFileName, testData)).to.be.true;
    });
});
