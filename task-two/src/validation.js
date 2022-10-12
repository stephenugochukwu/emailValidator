"use strict";
exports.__esModule = true;
var EmailValidator = require("email-validator");
var dns = require("dns");
var fs = require("fs");
/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath, outputFile) {
    var readStream = fs.createReadStream(inputPath, 'utf8');
    var writter = fs.createWriteStream(outputFile);
    readStream.on('data', function (chunks) {
        var mails = chunks.trim().split('\n');
        var validEmailArray = mails.filter(function (email) {
            return EmailValidator.validate(email);
        });
        console.log(validEmailArray);
        var _loop_1 = function (domain) {
            var d = domain.split('@')[1];
            dns.resolveMx(d, function (err, data) {
                if (data !== undefined) {
                    writter.write(d + '\n');
                }
            });
        };
        // const domainArry = validEmailArray.map((domain) =>
        // console.log(domainArry);
        for (var _i = 0, validEmailArray_1 = validEmailArray; _i < validEmailArray_1.length; _i++) {
            var domain = validEmailArray_1[_i];
            _loop_1(domain);
        }
    });
}
validateEmailAddresses('./fixtures/inputs/small-sample.csv', './fixtures/outPut.csv');
exports["default"] = validateEmailAddresses;
