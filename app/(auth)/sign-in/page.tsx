"use client";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";

import React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onBlur",
	});

	const onSubmit = async (data: SignInFormData) => {
		try {
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<h1 className="form-title">Sign Up & Personalize</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
				{/* Input */}
				<InputField
					name="email"
					label="Email"
					placeholder="Enter your email."
					register={register}
					error={errors.email}
					validation={{
						required: "Email name is required",
						pattern: /^\w+@\w+\.\w+$/,
						message: "Email address is required!",
					}}
				/>

				<InputField
					name="password"
					label="Password"
					placeholder="Enter a strong password"
					type="password"
					register={register}
					error={errors.password}
					validation={{ required: "Password is required", minLength: 8 }}
				/>

				<Button
					type="submit"
					disabled={isSubmitting}
					className="mt-5 w-full yellow-btn"
				>
					{isSubmitting ? "Logging In" : "Log In"}
				</Button>

				<FooterLink
					text="Don't have an account?"
					linkText="Sign Up"
					href="/sign-up"
				/>
			</form>
		</>
	);
};

export default SignIn;
