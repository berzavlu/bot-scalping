
const MongoClient = require('mongodb').MongoClient
const URI = 'mongodb+srv://scalping:7C7WN7j7tWf8v07Q@cluster0.bex6t.mongodb.net'

const DB_NAME = 'scalping'
// 7C7WN7j7tWf8v07Q scalping
class MongoHelper {
	constructor() {
		this.client = null
		this.dbName = DB_NAME
		this.session = null
	}

	async connect() {
		this.client = await MongoClient.connect(URI, {
			useNewUrlParser: true
		})
	}

	getDB() {
		return this.client.db(DB_NAME)
	}

	close() {
		if (this.client) {
			this.client.close()
		}
	}

	// startTransaction() {
	// 	this.session = this.client.startSession()
	// 	this.session.startTransaction()
	// }

	// async commitTransaction() {
	// 	await this.session.commitTransaction()
	// 	this.session.endSession()
	// }

	// async abortTransaction() {
	// 	// If an error occurred, abort the whole transaction and
	// 	// undo any changes that might have happened
	// 	if (this.session) {
	// 		await this.session.abortTransaction()
	// 		this.session.endSession()
	// 	}
	// }

	// getSession() {
	// 	return this.session
	// }

	// getOptions() {
	// 	return {
	// 		session: this.session,
	// 		returnOriginal: false
	// 	}
	// }
}

module.exports = MongoHelper
