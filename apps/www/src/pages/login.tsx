import { useState } from "react"

export default function Login() {
    const [hey, setHey] = useState("")
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
            </head>
            <body>
                <h1>Login {hey}</h1>
                <button onClick={() => alert("hey")}>Click me</button>
            </body>
        </html>
    )
}