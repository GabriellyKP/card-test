import { Box, Card, CardContent, CardHeader } from "@mui/material";
import Switch from "../../components/Switch";

export default function CardFooterOptions() {
  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardHeader title="Rodapé" />
      <CardContent>
        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Switch inputId="footer_add_button" title="Botão de adicionar" />
        </Box>

        <Box display="flex" gap="1rem" marginBottom="1rem">
          <Switch inputId="footer_details_button" title="Botão de detalhes" />
        </Box>
      </CardContent>
    </Card>
  );
}
