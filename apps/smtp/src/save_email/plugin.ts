
import axios from "axios";
import type { Connection, Next } from "../../types/parameter.js";
exports.hook_data = function (this, next: Next, connection: any) {
	// enable mail body parsing
	connection.transaction.parse_body = true;
	next();
}


exports.hook_queue = async function (this, next: Next, connection: Connection) {
	const transaction = connection.transaction;
	const mail_from = transaction.mail_from.address();
	const rcpt_to = transaction.rcpt_to.map((rcpt) => rcpt.address());
	const email_body = connection.transaction.body.children[0].bodytext;
	const subject = connection.transaction.header.get('subject')
	this.loginfo(`Subject: ${subject}`)
	this.loginfo({
		from: mail_from,
		to: rcpt_to,
		body: email_body,
		subject
	})

	const res = await axios.get("http://localhost:4001")

	this.loginfo(res.data)



	this.loginfo(
		`This mail came from: ${mail_from}\nIs for: ${rcpt_to}\nWith the content: ${email_body}`,
	);
	next(OK);
};

exports.plugin = {
	name: "save_email",
};