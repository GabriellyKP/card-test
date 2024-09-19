import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import Autocomplete from "../../../components/Autocomplete";
import { columsQuantityOptions } from "../../../data/columsQuantityOptions";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";

interface FieldConfigsModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  addField: (data: any) => void;
}

export default function FieldConfigsModal({
  open,
  setOpen,
  addField,
}: FieldConfigsModalProps) {
  const { watch, setValue, resetField } = useFormContext();

  const fieldType = watch("fieldType");
  const fieldTextSize = watch("fieldTextSize");
  const fieldColumns = watch("fieldColumns");
  const fieldTextAlign = watch("fieldTextAlign");

  useEffect(() => {
    if (open) {
      setValue("fieldTextSize", { label: "Normal", value: "normal" });
      setValue("fieldColumns", { label: "12 colunas", value: "12" });
      setValue("fieldTextAlign", { label: "Esquerda", value: "flex-start" });
    }
  }, [open]);

  const formatDataToCreateField = () => {
    const data = {
      name: "",
      value: "",
      field_type: fieldType.value,
      column: fieldColumns.value,
      text_size: fieldTextSize.value,
      align: fieldTextAlign.value,
    };

    addField(data);
  };

  const handleCloseFieldsConfigModal = (reason: any) => {
    if (reason !== "backdropClick") {
      resetField("fieldType");
      resetField("fieldTextSize");
      resetField("fieldColumns");
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(_, reason) => handleCloseFieldsConfigModal(reason)}
      fullWidth
    >
      <DialogTitle>Configurações do campo</DialogTitle>

      <DialogContent>
        <DialogContentText marginBottom="1rem">
          Selecione as opções desejadas para a criação do campo.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Autocomplete
              inputId="fieldType"
              label="Tipo de campo"
              options={[
                { label: "Campo de texto com valor", value: "1" },
                { label: "Campo de texto único", value: "2" },
                {
                  label: "Campo de separação de conteúdo",
                  value: "3",
                },
              ]}
            />
          </Grid>
          <Grid item sm={6}>
            <Autocomplete
              inputId="fieldTextSize"
              label="Tamanho do texto"
              disabled={fieldType?.value === "3"}
              options={[
                { label: "Pequeno", value: "small" },
                { label: "Normal", value: "normal" },
                {
                  label: "Grande",
                  value: "large",
                },
              ]}
            />
          </Grid>
          <Grid item sm={6}>
            <Autocomplete
              inputId="fieldColumns"
              label="Colunas"
              disabled={fieldType?.value === "3"}
              options={columsQuantityOptions}
            />
          </Grid>
          <Grid item sm={6}>
            <Autocomplete
              inputId="fieldTextAlign"
              label="Alinhamento do campo"
              disabled={fieldType?.value === "3"}
              options={[
                { label: "Esquerda", value: "flex-start" },
                { label: "Centralizado", value: "center" },
                {
                  label: "Direita",
                  value: "flex-end",
                },
              ]}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => handleCloseFieldsConfigModal(null)}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            formatDataToCreateField();
            handleCloseFieldsConfigModal(null);
          }}
        >
          Criar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
