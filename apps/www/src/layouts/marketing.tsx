import type { LayoutProps } from "../types/layout";

export default function MarketingLayout({ ...props }: LayoutProps) {
	return (
		<html lang="en">
			<head>
				<title>{props.title}</title>
				<meta name="description" content={props.description} />
				<link rel="icon" href={props.favicon} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
			</head>
			<body>
				{props.children}

				<script
					dangerouslySetInnerHTML={{
						__html: `window.__INITIAL_PROPS__ = ${JSON.stringify(props.ssrProps)}`,
					}}
				/>
			</body>
		</html>
	);
}
