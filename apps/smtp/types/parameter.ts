export type Next = (code?: undefined | null) => void

export type Connection = {
    // unqie id for this connection
    uuid: string,

    // remote
    remote: {
        ip: string,
        host: string,
        is_private: boolean,
        is_local: boolean,
    },

    // local
    local: {
        ip: string,
        host: string,
        port: number,
    },

    // proxy
    proxy: {
        ip: string,
        allowed: boolean,
        type: null | "haproxy"
    },

    // hello
    hello: {
        verb: "EHLO" | "HELO",
        host: string,
    },

    notes: any,

    relaying: boolean,

    current_line: number,


    // transaction
    transaction: {
        // unique id for this transaction
        uuid: string,

        // a nodejs readable stream for the message object
        message_stream: any,

        // number of bytes in the message after DATA
        data_bytes: number,
        
        notes: any,

        mail_from: {
            address: () => string,
            host: () => string,
            user: () => string,
            domain: () => string,
        },
        rcpt_to: {
            address: () => string,
            host: () => string,
            user: () => string,
            domain: () => string,
        }[],
        body: {
            children: {
                bodytext: () => string,
                body: () => string,
                header: () => string,
            }[],
        },
    },
}