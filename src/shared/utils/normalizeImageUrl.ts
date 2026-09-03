import { BASE_URL } from "../api/marketplace";

const fallbackImage = require("../../assets/images/logo.png");

export const normalizeImageUrl = (photo?: string | null) => {
  if (!photo) return fallbackImage;

  const value = photo.trim();

  if (!value) return fallbackImage;

  if (
    value.startsWith("http://localhost") ||
    value.startsWith("https://localhost") ||
    value.startsWith("http://127.0.0.1") ||
    value.startsWith("https://127.0.0.1")
  ) {
    const path = value.replace(
      /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?/i,
      "",
    );
    return { uri: `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}` };
  }

  if (value.startsWith("/")) {
    return { uri: `${BASE_URL}${value}` };
  }

  return { uri: value };
};
