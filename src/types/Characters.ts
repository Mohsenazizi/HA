import { PageInfoType } from './PageInfo';
import { CharacterType } from './Character';

export interface CharactersType {
  results: CharacterType[],
  info: PageInfoType,
}