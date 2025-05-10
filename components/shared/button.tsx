import React from "react";
import Link from "next/link";

interface ButtonProps {
    label?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    variant?: "default" | "ghost" | "green" | "black";
    href?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    children,
    onClick,
    type = "button",
    className = "",
    variant = "default",
    href,
}) => {
    const baseStyles =
        "overflow-hidden font-semibold rounded-full focus:outline-none transition duration-200 ease-in-out my-2 text-sm xxl:text-base";

    const defaultStyles = "bg-white text-black py-4 px-14 hover:opacity-90 ";
    const ghostStyles =
        "bg-transparent text-black px-14 py-3 border border-black";
    const greenStyles =
        "bg-green-500 text-white py-4 px-14 hover:opacity-90 border border-green-500";
    const blackStyles =
        "bg-black text-white py-4 px-14 border-2 border-white hover:opacity-90 border border-black";

    const buttonStyles =
        variant === "ghost"
            ? ghostStyles
            : variant === "green"
                ? greenStyles
                : variant === "black"
                    ? blackStyles
                    : defaultStyles;

    const ButtonContent = (
        <button
            type={type}
            className={`${baseStyles} ${buttonStyles} ${className}`}
            onClick={onClick}
        >
            {children || label}
        </button>
    );

    return href ? <Link href={href}>{ButtonContent}</Link> : ButtonContent;
};

export default Button;