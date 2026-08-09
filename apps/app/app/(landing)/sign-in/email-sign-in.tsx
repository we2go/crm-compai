"use client";

import { signIn, signUp } from "@crm/auth/client";
import { Button } from "@crm/ui/components/button";
import { Field, FieldLabel } from "@crm/ui/components/field";
import { Input } from "@crm/ui/components/input";
import { Spinner } from "@crm/ui/components/spinner";
import { useState } from "react";
import { toast } from "sonner";

export function EmailSignIn() {
	const [mode, setMode] = useState<"signin" | "signup">("signin");
	const [pending, setPending] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setPending(true);

		const origin = window.location.origin;
		const callbackURL = `${origin}/`;

		let error: {
			code?: string;
			message?: string;
			status: number;
			statusText: string;
		} | null = null;
		if (mode === "signin") {
			const result = await signIn.email({
				email,
				password,
				callbackURL,
			});
			error = result.error;
		} else {
			const result = await signUp.email({
				email,
				password,
				name,
				callbackURL,
			});
			error = result.error;
		}

		if (error) {
			toast.error(error.message ?? "Could not reach the sign-in service.");
			setPending(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			{mode === "signup" && (
				<Field>
					<FieldLabel htmlFor="name">Name</FieldLabel>
					<Input
						id="name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						autoComplete="name"
						required
					/>
				</Field>
			)}
			<Field>
				<FieldLabel htmlFor="email">Email</FieldLabel>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					autoComplete="email"
					required
				/>
			</Field>
			<Field>
				<FieldLabel htmlFor="password">Password</FieldLabel>
				<Input
					id="password"
					type="password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					autoComplete={mode === "signin" ? "current-password" : "new-password"}
					required
				/>
			</Field>
			<Button type="submit" className="w-full" disabled={pending}>
				{pending ? <Spinner data-icon="inline-start" /> : null}
				{mode === "signin" ? "Sign in" : "Create account"}
			</Button>
			<Button
				type="button"
				variant="ghost"
				className="w-full"
				disabled={pending}
				onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
			>
				{mode === "signin"
					? "Don't have an account? Sign up"
					: "Already have an account? Sign in"}
			</Button>
		</form>
	);
}
