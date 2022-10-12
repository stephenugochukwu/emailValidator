//import validator from 'email-validator';
import { chunk, result, split, toArray } from 'lodash';
import * as EmailValidator from 'email-validator';
import * as dns from 'dns'
import * as fs from 'fs';

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string, outputFile: string) {
  const readStream = fs.createReadStream(inputPath, 'utf8');
  const writter = fs.createWriteStream(outputFile);

  readStream.on('data', function (chunks: string) {
    const mails = chunks.trim().split('\n');

    const validEmailArray = mails.filter((email) =>
      EmailValidator.validate(email),
    );
    //console.log(validEmailArray);

    // const domainArry = validEmailArray.map((domain) =>
    //console.log(domainArry);

    for (const domain of validEmailArray) {
      const user = domain.split('@')[0] + '@';
      const d = domain.split('@')[1];
      dns.resolveMx(d, (err, data) =>{
        if (data !== undefined) {
          writter.write(user+ d + '\n');
        }
      });
    }
  });
}
validateEmailAddresses(
  './fixtures/inputs/small-sample.csv',
  './fixtures/outPut.csv',
);
export default validateEmailAddresses;
