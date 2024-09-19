import { ReactNode } from "react";
import {
  Autocomplete as MuiAutocomplete,
  TextField,
  TextFieldProps,
} from "@mui/material";

import { Controller, useFormContext } from "react-hook-form";

interface AutocompleteProps
  extends Omit<
    TextFieldProps,
    "InputLabelProps" | "error" | "value" | "select"
  > {
  inputId: string;
  options: Array<{ label: string; value: string | number }>;
  label?: string;
  required?: boolean;
  popupIcon?: ReactNode;
  disabled?: boolean;
}

export default function Autocomplete({
  inputId,
  options,
  label,
  required,
  popupIcon,
  disabled,
  ...rest
}: AutocompleteProps) {
  const { control, clearErrors, register } = useFormContext();

  return (
    <Controller
      name={inputId}
      control={control}
      render={({ field: { onBlur, onChange, value = "" } }) => (
        <MuiAutocomplete
          id={inputId}
          value={value}
          size="small"
          onChange={(_, data) => {
            onChange(data);
            clearErrors(inputId);
          }}
          options={options}
          onBlur={onBlur}
          ref={register(inputId)?.ref}
          popupIcon={popupIcon}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputLabelProps={{ shrink: true }}
              required={required}
              disabled={disabled}
              {...rest}
            />
          )}
          sx={{ "& .MuiAutocomplete-clearIndicator": { display: "none" } }}
        />
      )}
    />
  );
}
