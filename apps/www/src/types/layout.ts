import type { JSX } from "react";

export type LayoutProps = {
    children: JSX.Element;
    title: string;
    description: string;
    favicon: string;
    ssrProps: unknown;
}