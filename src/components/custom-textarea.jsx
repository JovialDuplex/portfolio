import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

const CustomTextarea = forwardRef(
    (
        {
            label, 
            name, 
            maxLength,
            error, 
            className,
            containerClassName,
            onChange, 
            value,
            defaultValue = "",
            required,
            ...rest
        },

        ref
    ) => {
        const [internalValue, setInternalValue] = useState(defaultValue);
        const currentValue = value !== undefined ? value : internalValue;
        const currentLength = currentValue?.length || 0;
        const isLimitReached = currentLength >= maxLength;

        const handleChange = (e)=>{
            let newValue = e.target.value;

            if(newValue.length > maxLength) {
                newValue = newValue.slice(0, maxLength);
                e.target.value = newValue;
            }
            if(value === undefined) {
                setInternalValue(newValue);
            }
            onChange?.(e)
        };

        return (
            <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
                {label && (
                    <label htmlFor={name} className="text-sm font-medium text-foreground">
                        {label} {required && <span className="text-red-500"> * </span>}
                    </label>
                )}
                
                {error && <span className="text-destructive"> {error} </span>}

                <Textarea 
                    ref = {ref}
                    id={name}
                    name={name}
                    maxLength={maxLength}
                    value={value}
                    defaultValue={value === undefined ? defaultValue : undefined }
                    onChange={handleChange}
                    aria-invalid={!!error}
                    className={cn(
                        "min-h-30 w-full rounded-md border px-3 py-2 text-sm",
                        "border-black placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "transition-colors",
                        error && "border-destructive focus-visible:ring-destructive",
                        className 
                    )}
                    {...rest}
                />
                <div className="flex items-center justify-end text-xs">
                    {maxLength && <span className={cn(
                        "text-muted-foreground",
                        isLimitReached && "text-destructive font-medium"
                    )}>
                        {currentLength} / {maxLength}
                    </span>}
                </div>
            </div>
        );
    }
); 

CustomTextarea.displayName = "CustomTextarea";
export default CustomTextarea;