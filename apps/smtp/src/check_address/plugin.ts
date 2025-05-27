import { Connection, Next } from "../../types/parameter.js";
import { This } from "../../types/this.js";

exports.hook_rcpt = function (this: This, next: Next, connection: Connection) {
    const mail_from = connection.transaction.mail_from.address();
    const rcpt_to = connection.transaction.rcpt_to.map(rcpt => rcpt.address());

    this.loginfo(`This mail came from: ${mail_from}\nIs for: ${rcpt_to}`)

    next(OK)
}

exports.plugin = {
    name: "check_address"
}