export const useCreateCardJson = (values) => {
  const cardData = {
    title: values.titleHeader,
    subheader: values.subheaderHeader,
    avatar: values.avatarHeader,
  };

  return cardData;
};
