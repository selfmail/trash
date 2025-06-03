import { useState } from "react"
import  { page } from "../utils/page"

export default page("/login", (req) => {
    return new Response("Hey")
})