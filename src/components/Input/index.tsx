import { ReactNode } from "react";
import { TextField, TextFieldProps } from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

interface InputProps
  extends Omit<
    TextFieldProps,
    "InputLabelProps" | "error" | "onChange" | "value" | "select"
  > {
  inputId: string;
  textInfo?: string | ReactNode;
  options?: { label: string; value: string }[];
  mask?: string;
  isHidden?: boolean;
  onBlurCallback?: () => void;
}

export default function Input({
  inputId,
  label,
  options,
  sx,
  ...rest
}: InputProps) {
  const { control, register } = useFormContext();

  return (
    <Controller
      name={inputId}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <TextField
            id={inputId}
            size="small"
            value={value}
            onChange={onChange}
            fullWidth
            label={label}
            ref={register(inputId).ref}
            InputLabelProps={{
              shrink: true,
            }}
            select={options && options?.length > 0}
            sx={{
              ...sx,
            }}
            {...rest}
          />
        );
      }}
    />
  );
}
