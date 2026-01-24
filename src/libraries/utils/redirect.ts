export const safeRedirectConsole = (value: unknown) => {
  if (typeof value !== "string") {
    return "/console";
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return "/console";
  }

  if (trimmed.startsWith("/")) {
    return trimmed.startsWith("/console") ? trimmed : "/console";
  }

  try {
    const url = new URL(trimmed);
    const path = `${url.pathname}${url.search}${url.hash}`;
    return path.startsWith("/console") ? path : "/console";
  } catch {
    return "/console";
  }
};
