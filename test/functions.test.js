import { expect } from 'chai';
import {readFromFile, getGroqChatCompletion} from '../index.js';
import fs from 'fs';
import Groq from 'groq-sdk';
import sinon from 'sinon';

// eslint-disable-next-line no-undef
describe('readFromFile', function() {
    // eslint-disable-next-line no-undef
    it('Should read data from a valid file.', async function() {
        const filename = 'test.js';
        const outputfile = null;
        const tokenUsage = false;
        const apiKey = process.env.GROQ_API_KEY;

        // Mock the fs.readFile method
        const originalReadFile = fs.readFile;
        fs.readFile = (file, encoding, callback) => {
            callback(null, 'file content');
        };

        await readFromFile(filename, outputfile, tokenUsage, apiKey);

        // Restore the original method
        fs.readFile = originalReadFile;
    });
    

    // eslint-disable-next-line no-undef
    it('Should reject if the file format is invalid.', async function() {
        const filename = 'test.invalid';
        const outputfile = null;
        const tokenUsage = false;
        const apiKey = process.env.GROQ_API_KEY;

        try {
            await readFromFile(filename, outputfile, tokenUsage, apiKey);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Invalid file format.');
        }
    });

    // eslint-disable-next-line no-undef
    it('Should throw an error if fs.readFile fails.', async function() {
        const filename = 'test.js';
        const outputfile = null;
        const tokenUsage = false;
        const apiKey = process.env.GROQ_API_KEY;

        // Mock the fs.readFile method to simulate an error
        const originalReadFile = fs.readFile;
        fs.readFile = (file, encoding, callback) => {
            callback(new Error('Read file error'));
        };

        try {
            await readFromFile(filename, outputfile, tokenUsage, apiKey);
        } catch (error) {
            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.equal('Read file error');
        } finally {
            // Restore the original method
            fs.readFile = originalReadFile;
        }
    });
});


// eslint-disable-next-line no-undef
describe('LLM App Tests', function() {
    // eslint-disable-next-line no-undef
    afterEach(() => {
        sinon.restore();
    });

    // eslint-disable-next-line no-undef
    describe('getGroqChatCompletion', function() {
        // eslint-disable-next-line no-undef
        it('should return a mocked LLM response', async function() {
            const mockApiKey = 'fake-api-key';
            const mockData = 'source code';
            const mockResponse = {
                choices: [{ message: { content: 'commented source code' } }],
                usage: { total_tokens: 100 }
            };

            // Create a mock instance of the Groq class
            const groqInstance = new Groq({ apiKey: mockApiKey });
            const mockCompletions = sinon.stub().resolves(mockResponse);
            sinon.stub(groqInstance.chat.completions, 'create').value(mockCompletions);

            // Inject the mock instance into the function (you might need to adapt this based on your code)
            const response = await getGroqChatCompletion(mockData, mockApiKey, groqInstance);
            expect(response).to.deep.equal(mockResponse);
        });
    });
});


