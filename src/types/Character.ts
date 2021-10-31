export interface LocationType {
  name: string;
  location: string;
}

export interface OriginType {
  name: string;
  url: string;
}

export interface CharacterType {
  id: number;
  status: string;
  name: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginType;
  location: LocationType;
  image: string;
  episode: string[];
  url: string;
  created: string;
}