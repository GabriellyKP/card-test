import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

import InputsChangeType from "../../components/InputsChangeType";

export default function CardHeaderOptions() {
  const { resetField, setValue } = useFormContext();

  const [addTitleHeader, setAddTitleHeader] = useState<boolean>(false);
  const [addAvatarHeader, setAddAvatarHeader] = useState<boolean>(false);
  const [addSubheaderHeader, setAddSubheaderHeader] = useState<boolean>(false);

  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardHeader title="Cabeçalho" />
      <CardContent>
        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Box display="flex" alignItems="center">
            <Switch
              title="Título"
              checked={addTitleHeader}
              onChange={() => {
                if (addTitleHeader) {
                  resetField("headerTitle");
                }
                setAddTitleHeader(!addTitleHeader);
              }}
            />
            <Typography>Título</Typography>
          </Box>
          {addTitleHeader && (
            <InputsChangeType inputId="headerTitle" label="Título" />
          )}
        </Box>

        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Box display="flex" alignItems="center">
            <Switch
              checked={addAvatarHeader}
              onChange={() => {
                if (addAvatarHeader) {
                  setValue("headerAvatar", null);
                }
                setAddAvatarHeader(!addAvatarHeader);
              }}
            />
            <Typography>Avatar</Typography>
          </Box>
          {addAvatarHeader && (
            <TextField
              type="file"
              onChange={(e) => {
                setValue("headerAvatar", e);
              }}
            />
          )}
        </Box>

        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Box display="flex" alignItems="center">
            <Switch
              checked={addSubheaderHeader}
              onChange={() => {
                if (addSubheaderHeader) {
                  resetField("headerSubheader");
                }
                setAddSubheaderHeader(!addSubheaderHeader);
              }}
            />
            <Typography>Subtítulo</Typography>
          </Box>
          {addSubheaderHeader && (
            <InputsChangeType inputId="headerSubheader" label="Subtítulo" />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
