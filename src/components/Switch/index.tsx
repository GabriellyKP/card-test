import { Box, Switch as SwitchMui, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface SwitchProps {
  inputId: string;
  title: string;
}

export default function Switch({ inputId, title }: SwitchProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={inputId}
      control={control}
      render={({ field: { onChange, value = false } }) => (
        <Box display="flex" alignItems="center">
          <SwitchMui checked={value} onChange={onChange} />
          <Typography>{title}</Typography>
        </Box>
      )}
    />
  );
}
