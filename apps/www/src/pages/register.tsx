import { page } from "../utils/page";
import { render } from "../utils/render";

export default page("/register", async (req) => {

	return await render(
		<div>
			hey!
			<button type="button" onClick={() => alert(`Hey `)} onKeyDown={() => alert(`Hey `)}>click me</button>
		</div>,
	);
});
