import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, MouseEvent, Ref } from "react";
import { cn } from "@workspace/ui/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				outline:
					"border bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
			},
			size: {
				default: "h-10 px-4 py-2",
				icon: "size-10",
				lg: "h-12 rounded-lg px-8 text-base",
				sm: "h-9 rounded-md px-3",
			},
		},
		defaultVariants: {
			size: "default",
			variant: "default",
		},
	},
);

export interface ButtonProps
	extends ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	ref?: Ref<HTMLButtonElement>;
}

export function Button({
	asChild = false,
	className,
	disabled,
	onClick,
	ref,
	size,
	tabIndex,
	type,
	variant,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot : "button";
	const componentProps = asChild
		? {
				...props,
				...(disabled
					? {
							"aria-disabled": true,
							"data-disabled": "true",
							onClick: (event: MouseEvent<HTMLElement>) => {
								event.preventDefault();
								event.stopPropagation();
							},
							tabIndex: -1,
						}
					: { onClick, tabIndex }),
			}
		: { ...props, disabled, onClick, tabIndex, type: type ?? "button" };

	return (
		<Comp
			className={cn(
				buttonVariants({ className, size, variant }),
				"data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
			)}
			ref={ref}
			{...componentProps}
		/>
	);
}
