"use strict";
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var EmailValidator = require("email-validator");
//import { domain } from 'process';
var fs_1 = require("fs");
function analyseFiles(inputPaths, outputPath) {
    console.log('Complete the implementation in src/analysis.ts');
    var result = {};
    var totalEmailsParsed = 0;
    var totalValidEmails = 0;
    var validEmailCountObj = {};
    //const validDomainArr: string[] = [];
    var readStream = fs_1["default"].createReadStream(inputPaths, 'utf8');
    readStream.on('data', function (chunks) {
        var mails = chunks.trim().split('\n');
        var NameOfMails = mails.shift();
        for (var _i = 0, mails_1 = mails; _i < mails_1.length; _i++) {
            var emailAddress = mails_1[_i];
            totalEmailsParsed++;
        }
        result.totalEmailsParsed = totalEmailsParsed;
        var validEmailArray = mails.filter(function (email) {
            return EmailValidator.validate(email);
        });
        var splitedArr = [];
        for (var _a = 0, validEmailArray_1 = validEmailArray; _a < validEmailArray_1.length; _a++) {
            var domain = validEmailArray_1[_a];
            totalValidEmails++;
            splitedArr.push(domain.split('@')[1]);
        }
        result.totalValidEmails = totalValidEmails;
        var uniqueValidEmail = __spreadArray([], new Set(splitedArr), true);
        result['valid-domains'] = uniqueValidEmail;
        //console.log(result)
        for (var _b = 0, splitedArr_1 = splitedArr; _b < splitedArr_1.length; _b++) {
            var validmail = splitedArr_1[_b];
            if (validEmailCountObj[validmail]) {
                validEmailCountObj[validmail]++;
            }
            else {
                validEmailCountObj[validmail] = 1;
            }
        }
        result.categories = validEmailCountObj;
        console.log(validEmailCountObj);
        console.log(result);
    });
}
// analyseFiles('./fixtures/inputs/small-sample.csv', '');
exports["default"] = analyseFiles;
