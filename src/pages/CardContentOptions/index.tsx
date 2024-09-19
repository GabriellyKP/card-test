import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import Autocomplete from "../../components/Autocomplete";
import InputsChangeType from "../../components/InputsChangeType";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { DragIndicator } from "@mui/icons-material";
import ColorPickerButton from "../../components/ColorPickerButton";
import FieldConfigsModal from "./FieldConfigsModal";

export default function CardContentOptions() {
  const { resetField, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });
  const {
    fields: informationFields,
    append: appendInformation,
    remove: removeInformation,
    move: moveInformation,
  } = useFieldArray({
    control,
    name: "informationFields",
  });

  const [addContentBanner, setAddContentBanner] = useState<boolean>(false);
  const [addTags, setAddTags] = useState<boolean>(false);
  const [addInformations, setAddInformations] = useState<boolean>(false);
  const [openConfigModal, setOpenConfigModal] = useState<boolean>(false);

  const addTagInput = () => {
    append({ tag: "", color: "#F13E69" });
  };

  const addInformationInput = (data: any) => {
    appendInformation(data);
  };

  useEffect(() => {
    if (fields.length === 0 && addTags) {
      addTagInput();
    }
  }, [addTags]);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    moveInformation(result.source.index, result.destination.index);
  };

  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardHeader title="Conteúdo" />
      <CardContent>
        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Box display="flex" alignItems="center">
            <Switch
              checked={addContentBanner}
              onChange={() => {
                if (addContentBanner) {
                  resetField("contentBannerType");
                }
                setAddContentBanner(!addContentBanner);
              }}
            />
            <Typography>Banner</Typography>
          </Box>
          {addContentBanner && (
            <Autocomplete
              inputId="contentBannerType"
              label="Tipo de banner"
              options={[
                { label: "Banner com miniaturas de fotos", value: "1" },
                { label: "Banner com carrossel de fotos", value: "2" },
                {
                  label: "Banner com carrossel de fotos paginada",
                  value: "3",
                },
                { label: "Banner de foto única", value: "4" },
              ]}
            />
          )}
        </Box>

        <Box marginBottom="1rem">
          <Box display="flex" gap="1rem">
            <Box display="flex" alignItems="center">
              <Switch
                checked={addTags}
                onChange={() => {
                  remove();
                  setAddTags(!addTags);
                }}
              />
              <Typography>Etiquetas</Typography>
            </Box>
            {addTags && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => addTagInput()}
              >
                Adicionar Tag
              </Button>
            )}
          </Box>

          {addTags && (
            <Grid container marginTop="1rem" spacing={1}>
              {fields.map((tag, index) => (
                <Grid item sm={6} key={tag.id} display="flex">
                  <ColorPickerButton inputId={`tags.${index}.color`} />
                  <InputsChangeType
                    inputId={`tags.${index}.tag`}
                    label={`Tag ${index + 1}`}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box marginBottom="1rem">
          <Box display="flex" gap="1rem">
            <Box display="flex" alignItems="center">
              <Switch
                checked={addInformations}
                onChange={() => {
                  removeInformation();
                  setAddInformations(!addInformations);
                }}
              />
              <Typography>Informações</Typography>
            </Box>
            {addInformations && (
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenConfigModal(true)}
              >
                Adicionar campo
              </Button>
            )}
          </Box>

          <Box>
            {addInformations && (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="information">
                  {(droppableProvided) => (
                    <Box
                      ref={droppableProvided.innerRef}
                      {...droppableProvided.droppableProps}
                    >
                      {informationFields.map((field: any, index) => (
                        <Draggable
                          key={field.id}
                          draggableId={field.id}
                          index={index}
                        >
                          {(draggableProvided) => (
                            <Grid
                              key={field.id}
                              container
                              marginTop="1rem"
                              spacing={1}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                            >
                              {field.field_type === "1" && (
                                <Grid
                                  item
                                  sm={12}
                                  display="flex"
                                  alignItems="center"
                                >
                                  <Box
                                    {...draggableProvided.dragHandleProps}
                                    sx={{ cursor: "grab" }}
                                  >
                                    <DragIndicator
                                      sx={{ color: "action.disabled" }}
                                    />
                                  </Box>
                                  <InputsChangeType
                                    inputId={`informationFields.${index}.name`}
                                    label={`Nome do campo ${index + 1}`}
                                  />
                                  <InputsChangeType
                                    inputId={`informationFields.${index}.value`}
                                    label={`Valor do campo ${index + 1}`}
                                  />
                                </Grid>
                              )}
                              {field.field_type === "2" && (
                                <Grid
                                  item
                                  sm={12}
                                  display="flex"
                                  alignItems="center"
                                >
                                  <Box
                                    {...draggableProvided.dragHandleProps}
                                    sx={{ cursor: "grab" }}
                                  >
                                    <DragIndicator
                                      sx={{ color: "action.disabled" }}
                                    />
                                  </Box>
                                  <InputsChangeType
                                    inputId={`informationFields.${index}.value`}
                                    label={`Valor do campo ${index + 1}`}
                                  />
                                </Grid>
                              )}
                              {field.field_type === "3" && (
                                <Grid
                                  item
                                  sm={12}
                                  display="flex"
                                  alignItems="center"
                                >
                                  <Box
                                    {...draggableProvided.dragHandleProps}
                                    sx={{ cursor: "grab" }}
                                  >
                                    <DragIndicator
                                      sx={{ color: "action.disabled" }}
                                    />
                                  </Box>
                                  <Box width="100%">
                                    <Divider />
                                  </Box>
                                </Grid>
                              )}
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </Box>
        </Box>

        {openConfigModal && (
          <FieldConfigsModal
            open={openConfigModal}
            setOpen={setOpenConfigModal}
            addField={(data) => addInformationInput(data)}
          />
        )}
      </CardContent>
    </Card>
  );
}
