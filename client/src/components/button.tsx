import { forwardRef, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonStyle = tv({
	base: "rounded-lg  h-10 py-3 flex  px-4 items-center text-sm font-medium gap-2 transition-colors",
	variants: {
		variant: {
			primary: "bg-violet-500 text-violet-50  hover:bg-violet-600 ",
			secondary: "bg-zinc-900 text-zinc-400 hover:bg-violet-800",
		},
	},
});

type buttonStyleProps = VariantProps<typeof buttonStyle>;

type buttonProps = ComponentProps<"button"> & buttonStyleProps;

export const Button = forwardRef<HTMLButtonElement, buttonProps>(
	(props, ref) => {
		const { variant = "primary", type = "button", className, ...rest } = props;
		return (
			<button
				ref={ref}
				type={"button"}
				className={buttonStyle({
					className: className,
					variant,
				})}
				{...rest}
			/>
		);
	},
);
