/**
 * Extracts the release year from a Spotify date string.
 * Spotify can return YYYY-MM-DD, YYYY-MM, or YYYY.
 */
export const releaseYear = (releaseDate: string): string =>
  releaseDate.split("-")[0];
