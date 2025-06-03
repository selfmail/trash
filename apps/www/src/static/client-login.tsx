
import { hydrateRoot } from "react-dom/client";
import page from "../pages/login";

const Component = await page.component;

const props = (window as any).__INITIAL_PROPS__;
hydrateRoot(document.getElementById("root")!, <Component {...props} />);
