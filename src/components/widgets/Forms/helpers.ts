export const validateImageUrl = (value: string) => {
  if (!value) return true;
  const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))(?:[?/].*)?$/i;
  return pattern.test(value);
};
