import { products } from "./products";

const randomIndex = Math.floor(Math.random() * 4);

export const productSelectOptions = [
  { label: "Nome do produto", value: products[randomIndex].name },
  { label: "Descrição do produto", value: products[randomIndex].description },
  { label: "Preço do produto", value: products[randomIndex].price },
  { label: "Código", value: products[randomIndex].code },
  {
    label: "Data de previsão de chegada",
    value: products[randomIndex].date_preview,
  },
  { label: "Estoque", value: products[randomIndex].stock },
  {
    label: "Estoque franqueadora",
    value: products[randomIndex].stock_franchisor,
  },
  { label: "Média de vendas", value: products[randomIndex].sales_avarege },
];
