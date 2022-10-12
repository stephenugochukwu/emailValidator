/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */

 import { chunk, result, split, toArray } from 'lodash';
 import * as EmailValidator from 'email-validator';
 //import { domain } from 'process';
 import fs from 'fs';

 function analyseFiles(inputPaths: string, outputPath: string) {
  //  console.log('Complete the implementation in src/analysis.ts');
   type ResultObj = { [key: string]: unknown };
   type categories = { [key: string]: number };
   const result: ResultObj = {};
   let totalEmailsParsed = 0;
   let totalValidEmails = 0;
   const validEmailCountObj: categories = {};
   //const validDomainArr: string[] = [];

   const readStream = fs.createReadStream(inputPaths, 'utf8');
   readStream.on('data', function (chunks: string) {
     const mails = chunks.trim().split('\n');
     const NameOfMails = mails.shift();

     for (const emailAddress of mails) {
       totalEmailsParsed++;
     }
     result.totalEmailsParsed = totalEmailsParsed;

     const validEmailArray = mails.filter((email) =>
       EmailValidator.validate(email),
     );

     const splitedArr: string[] = [];

     for (const domain of validEmailArray) {
       totalValidEmails++;
       splitedArr.push(domain.split('@')[1]);
     }

     result.totalValidEmails = totalValidEmails;

     const uniqueValidEmail = [...new Set(splitedArr)];
     result['valid-domains'] = uniqueValidEmail;
     //console.log(result)

     for (const validmail of splitedArr) {
       if (validEmailCountObj[validmail]) {
         validEmailCountObj[validmail]++;
       } else {
         validEmailCountObj[validmail] = 1;
       }
     }
     result.categories = validEmailCountObj;
     console.log(validEmailCountObj);
     console.log(result);
   });
 }

 analyseFiles('./fixtures/inputs/small-sample.csv', '');

 export default analyseFiles;
