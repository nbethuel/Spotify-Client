export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  images: SpotifyImage[];
  artists: SpotifyArtist[];
}

export interface SpotifyAlbumSearchResult {
  items: SpotifyAlbum[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  track_number: number;
  duration_ms: number;
}

export interface SpotifyAlbumDetail extends SpotifyAlbum {
  label: string;
  total_tracks: number;
  tracks: {
    items: SpotifyTrack[];
  };
}
