export type Hook = "init_master"
    | "init_child"
    | "init_http"
    | "init_wss"
    | "connect_init"
    | "lookup_rdns"
    | "connect"
    | "capabilities"
    | "unrecognized_command"
    | "disconnect"
    | "helo"
    | "ehlo"
    | "quit"
    | "vrfy"
    | "noop"
    | "rset"
    | "mail"
    | "rcpt"
    | "rcpt_ok"
    | "data"
    | "data_post"
    | "max_data_exceeded"
    | "queue"
    | "queue_outbound"
    | "queue_ok"
    | "reset_transaction"
    | "deny"
    | "get_mx"
    | "deferred"
    | "bounce"
    | "delivered"
    | "send_email"
    | "pre_send_trans_email"
