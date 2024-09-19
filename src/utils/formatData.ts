export const formatMoney = (price: number): string => {
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return money.format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};
