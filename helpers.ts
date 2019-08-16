let request = require('request');

if (process.env.proxy) {
	request = request.defaults({'proxy': process.env.proxy});
}

export default class Helpers {
	public static getJSONFromUrl(url: string): Promise<any> {
		return new Promise(function (resolve: Function, reject: Function) {
			request.get({
				url: url,
				json: true,
				headers: { 'User-Agent': 'request' }
			}, (err, res, data) => {
				if (err) {
					console.log('Error:', err);
					reject('Error:', err);
				} else if (res.statusCode !== 200) {
					console.log('Status:', res.statusCode);
					reject('Status:', res.statusCode);
				} else {
					resolve(data);
				}
			});
		});
	}

	public static printArray(array: string[]) {
		let out = '';
		for (let i = 0; i < array.length; i++) {
			out += array[i];
			if (i < array.length - 1) {
				out += ', ';
			}
		}
		return out;
	}

	public static;
}