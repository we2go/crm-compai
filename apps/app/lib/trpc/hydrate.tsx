import "server-only";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getQueryClient } from "./query-client";

export function HydrateClient({ children }: { children: ReactNode }) {
	const client = getQueryClient();
	const state = dehydrate(client);
	return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
