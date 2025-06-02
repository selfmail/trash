import  { route } from "../utils/route";

export default route("/api/login", "GET", (req) => {
    return new Response("hey")
})