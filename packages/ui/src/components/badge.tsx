import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, Ref } from "react";
import { cn } from "@workspace/ui/lib/utils";

export const badgeVariants = cva(
	"inline-flex w-fit shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground",
				outline: "text-foreground",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

export interface BadgeProps
	extends ComponentProps<"span">,
		VariantProps<typeof badgeVariants> {
	ref?: Ref<HTMLSpanElement>;
}

export function Badge({ className, ref, variant, ...props }: BadgeProps) {
	return (
		<span
			className={cn(badgeVariants({ className, variant }))}
			ref={ref}
			{...props}
		/>
	);
}
