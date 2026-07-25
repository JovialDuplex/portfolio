import * as React from "react";
import { IconPicker, type IconPickerProps } from "./IconPicker";

export type IconPickerFieldProps = Omit<IconPickerProps, "value" | "onChange"> & {
  value?: string | null;
  onChange?: (iconId: string | null) => void;
};

/**
 * Thin adapter so `IconPicker` drops straight into RHF's `render` prop
 * without extra glue:
 *
 * <FormField
 *   control={control}
 *   name="icon"
 *   render={({ field }) => (
 *     <IconPickerField value={field.value} onChange={field.onChange} />
 *   )}
 * />
 */
export const IconPickerField = React.forwardRef<HTMLButtonElement, IconPickerFieldProps>(
  ({ value, onChange, ...rest }, _ref) => {
    return (
      <IconPicker
        value={value}
        onChange={(iconId) => onChange?.(iconId)}
        {...rest}
      />
    );
  }
);
IconPickerField.displayName = "IconPickerField";
