
import fetch from "node-fetch"
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
    const rcpt = rcpt_to[0].split("@")[0]

	this.loginfo({
		from: mail_from,
		to: `${rcpt}@trash.company`,
		body: email_body,
		subject
	})

	this.loginfo(JSON.stringify({
		from: mail_from,
		to: rcpt,
		body: email_body.toString(),
		subject
	}))

	const res = await fetch("http://localhost:4001/api/receive", {
		method: "POST",
		body: JSON.stringify({
			from: mail_from,
			to: `${rcpt}@trash.company`,
			body: email_body.toString(),
			subject
		})
	})

	if (!res.ok) {
		this.loginfo("Error at saving the email for " + rcpt_to)
		return next(DENY)
	}



	this.loginfo(
		`This mail came from: ${mail_from}\nIs for: ${rcpt_to}\nWith the content: ${email_body}`,
	);
	next(OK);
};

exports.plugin = {
	name: "save_email",
};