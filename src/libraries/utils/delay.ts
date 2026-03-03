export const delay = (delayInms = 2000) =>
  new Promise((resolve) => setTimeout(resolve, delayInms));
