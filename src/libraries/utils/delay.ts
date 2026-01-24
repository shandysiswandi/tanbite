export const delay = (delayInms = 2000) => {
  return new Promise((resolve) => setTimeout(resolve, delayInms));
};
