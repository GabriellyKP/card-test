import { Box, IconButton } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import Input from "../Input";
import Autocomplete from "../Autocomplete";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { productSelectOptions } from "../../data/productSelectOptions";

interface InputsChangeTypeProps {
  inputId: string;
  label: string;
}

export default function InputsChangeType({
  inputId,
  label,
}: InputsChangeTypeProps) {
  const [valueType, setValueType] = useState<string>("text");

  return (
    <Fragment>
      {valueType === "text" ? (
        <Box display="flex" width="100%">
          <Input inputId={inputId} label={label} />
          <IconButton
            onClick={() => setValueType("select")}
            sx={{ padding: 0 }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      ) : (
        <Box display="flex" width="100%">
          <Autocomplete
            inputId={inputId}
            label={label}
            options={productSelectOptions}
          />
          <IconButton onClick={() => setValueType("text")} sx={{ padding: 0 }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      )}
    </Fragment>
  );
}
