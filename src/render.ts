import { type Options, render as reactEmailRender } from "@react-email/render";
import type { ReactNode } from "react";

export async function render(element: ReactNode, options?: Options): Promise<string> {
  return reactEmailRender(element, options);
}
