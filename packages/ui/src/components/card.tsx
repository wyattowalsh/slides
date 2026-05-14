import type { ComponentProps, Ref } from "react";
import { cn } from "@workspace/ui/lib/utils";

export interface CardProps extends ComponentProps<"div"> {
	ref?: Ref<HTMLDivElement>;
}

export function Card({ className, ref, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-xl border bg-card text-card-foreground shadow-sm",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
}

export function CardHeader({ className, ref, ...props }: CardProps) {
	return (
		<div
			className={cn("flex flex-col gap-1.5 p-6", className)}
			ref={ref}
			{...props}
		/>
	);
}

export function CardTitle({
	className,
	ref,
	...props
}: ComponentProps<"h3"> & { ref?: Ref<HTMLHeadingElement> }) {
	return (
		<h3
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				className,
			)}
			ref={ref}
			{...props}
		/>
	);
}

export function CardDescription({
	className,
	ref,
	...props
}: ComponentProps<"p"> & { ref?: Ref<HTMLParagraphElement> }) {
	return (
		<p
			className={cn("text-sm text-muted-foreground", className)}
			ref={ref}
			{...props}
		/>
	);
}

export function CardContent({ className, ref, ...props }: CardProps) {
	return <div className={cn("p-6 pt-0", className)} ref={ref} {...props} />;
}

export function CardFooter({ className, ref, ...props }: CardProps) {
	return (
		<div
			className={cn("flex items-center p-6 pt-0", className)}
			ref={ref}
			{...props}
		/>
	);
}
