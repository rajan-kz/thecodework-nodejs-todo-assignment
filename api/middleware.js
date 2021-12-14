const admin = require('./firebase/firebase');

class Middleware {
	async decodeToken(req, res, next) {
		if(req.method === 'OPTIONS') {
			return next();
		}
		try {
			const token = req.headers.authorization.split(' ')[1];
			const decodeValue = await admin.auth().verifyIdToken(token);
			if (decodeValue) {
				req.user = decodeValue;
				return next();
			}
			return res.json({ message: 'Un authorize' });
		} catch (e) {
			console.error(e);
			return res.json({ message: 'Internal Error' });
		}
	}
}

module.exports = new Middleware();
