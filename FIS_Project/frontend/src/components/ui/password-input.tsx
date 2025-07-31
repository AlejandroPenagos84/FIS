import * as React from "react";
import { useState, useRef } from "react";
import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative w-full">
        <Input
            type={showPassword ? "text" : "password"}
            className={`pr-10 ${className ?? ""}`} 
            {...props}
        />
        <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer select-none 
            text-muted-foreground"
        >
            {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
        </span>
        </div>
    );
};

export { PasswordInput };
