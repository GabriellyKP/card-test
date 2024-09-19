import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CardHeaderOptions from "./pages/CardHeaderOptions";
import CardContentOptions from "./pages/CardContentOptions";
import CarouselThumbGallery from "./components/CarouselThumbGallery";
import CarouselNavigation from "./components/CarouselNavigation";
import CarouselSlidePagination from "./components/CarouselSlidePagination";
import { v4 as uuidv4 } from "uuid";
import CardFooterOptions from "./pages/CardFooterOptions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function App() {
  const useFormProvider = useForm();

  const { watch } = useFormProvider;

  const [avatarHeader, setAvatarHeader] = useState<any>();

  const avatarSelected = watch("headerAvatar");

  const titleHeader = watch("headerTitle");
  const subheaderHeader = watch("headerSubheader");
  const bannerType = watch("contentBannerType");
  const tags = watch("tags");
  const informations = watch("informationFields");
  const footerAddButton = watch("footer_add_button");
  const footerDetailsButton = watch("footer_details_button");

  useEffect(() => {
    if (avatarSelected) {
      handleImageChange(avatarSelected);
    } else {
      setAvatarHeader(null);
    }
  }, [avatarSelected]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarHeader(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setAvatarHeader(null);
    }
  };

  return (
    <FormProvider {...useFormProvider}>
      <Box display="flex" gap="5rem">
        <Box width="50%">
          <CardHeaderOptions />
          <CardContentOptions />
          <CardFooterOptions />
        </Box>

        <Card
          sx={{
            width: "300px",
            maxWidth: "300px",
            height: "fit-content",
          }}
        >
          {(titleHeader || avatarHeader || subheaderHeader) && (
            <CardHeader
              titleTypographyProps={{ variant: "body" }}
              subheaderTypographyProps={{ variant: "body2" }}
              {...(titleHeader && {
                title:
                  typeof titleHeader === "object"
                    ? titleHeader.value
                    : titleHeader,
              })}
              {...(avatarHeader && {
                avatar: <Avatar src={avatarHeader} alt={"teste"} />,
              })}
              {...(subheaderHeader && {
                subheader:
                  typeof subheaderHeader === "object"
                    ? subheaderHeader.value
                    : subheaderHeader,
              })}
            />
          )}

          {bannerType && (
            <Box position="relative">
              <Grid
                container
                position="absolute"
                top={0}
                left={0}
                p={1}
                zIndex={2}
                spacing={1}
              >
                {tags?.map((item: any) => {
                  return (
                    <Grid
                      item
                      sm={6}
                      key={item.tag === "object" ? item.tag.value : item.tag}
                    >
                      <Chip
                        label={
                          typeof item.tag === "object"
                            ? item.tag.value
                            : item.tag
                        }
                        sx={{ background: item.color, height: "1.3rem" }}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {bannerType?.value === "1" ? (
                <CarouselThumbGallery />
              ) : bannerType?.value === "2" ? (
                <CarouselNavigation />
              ) : bannerType?.value === "3" ? (
                <CarouselSlidePagination />
              ) : (
                <CardMedia
                  component="img"
                  image="https://img.freepik.com/psd-gratuitas/sapatos-de-corrida-ou-tenis-com-fundo-transparente_84443-1604.jpg?w=740&t=st=1718720777~exp=1718721377~hmac=ab701d11db6cf9442521d6c1ec68fc3096b913300ee5bd3f94f09ee9d48bb260"
                  alt="Paella dish"
                />
              )}
            </Box>
          )}
          <CardContent>
            <Grid container spacing={1}>
              {informations?.map((item: any) => (
                <Grid
                  item
                  display="flex"
                  sm={item.column}
                  key={uuidv4()}
                  justifyContent={item.align}
                >
                  {item.field_type === "1" && (
                    <Typography
                      fontSize={
                        item.text_size === "small"
                          ? "0.75rem"
                          : item.text_size === "large"
                          ? "1rem"
                          : "0.875rem"
                      }
                      sx={{ wordBreak: "break-word" }}
                    >
                      {`${
                        typeof item?.name === "object"
                          ? item?.name?.value
                          : item?.name
                      }: ${
                        typeof item?.value === "object"
                          ? item?.value?.value
                          : item?.value
                      }`}
                    </Typography>
                  )}
                  {item.field_type === "2" && (
                    <Typography
                      fontSize={
                        item.text_size === "small"
                          ? "0.75rem"
                          : item.text_size === "large"
                          ? "1rem"
                          : "0.875rem"
                      }
                      sx={{ wordBreak: "break-word" }}
                    >
                      {` ${
                        typeof item?.value === "object"
                          ? item?.value?.value
                          : item?.value
                      }`}
                    </Typography>
                  )}
                  {item.field_type === "3" && (
                    <Box width="100%">
                      <Divider />
                    </Box>
                  )}
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="flex-end"
              width="100%"
              gap="1rem"
            >
              {footerDetailsButton && (
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<InfoOutlinedIcon />}
                  fullWidth
                >
                  Detalhes
                </Button>
              )}
              {footerAddButton && (
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  fullWidth
                >
                  Adicionar
                </Button>
              )}
            </Box>
          </CardActions>
        </Card>
      </Box>
    </FormProvider>
  );
}

export default App;
