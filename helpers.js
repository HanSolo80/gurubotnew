"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let request = require('request');
if (process.env.proxy) {
    request = request.defaults({ 'proxy': process.env.proxy });
}
class Helpers {
    static getJSONFromUrl(url) {
        return new Promise(function (resolve, reject) {
            request.get({
                url: url,
                json: true,
                headers: { 'User-Agent': 'request' }
            }, (err, res, data) => {
                if (err) {
                    console.log('Error:', err);
                    reject('Error:', err);
                }
                else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                    reject('Status:', res.statusCode);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    static printArray(array) {
        let out = '';
        for (let i = 0; i < array.length; i++) {
            out += array[i];
            if (i < array.length - 1) {
                out += ', ';
            }
        }
        return out;
    }
}
exports.default = Helpers;
//# sourceMappingURL=helpers.js.map