import { Box, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Controller, useFormContext } from "react-hook-form";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

interface ColorPickerButtonProps {
  inputId: string;
}

export default function ColorPickerButton({ inputId }: ColorPickerButtonProps) {
  const { control, watch } = useFormContext();
  const [openColorSelector, setOpenColorSelector] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const color = watch(inputId);

  return (
    <Box>
      <IconButton
        disableRipple
        onClick={(event) => {
          setOpenColorSelector(!openColorSelector);
          setAnchorEl(event.currentTarget);
        }}
      >
        <FormatColorFillIcon sx={{ color: color }} />
      </IconButton>

      {openColorSelector && (
        <Popover
          open={openColorSelector}
          anchorEl={anchorEl}
          onClose={() => setOpenColorSelector(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Controller
            name={inputId}
            control={control}
            render={({ field: { onChange, value } }) => (
              <ChromePicker
                disableAlpha
                color={value}
                onChange={(color) => onChange(color?.hex)}
              />
            )}
          />
        </Popover>
      )}
    </Box>
  );
}
