export interface ItemData{
  id: string;
  name: string;
  type: ItemType;
  children?: ItemData[] | null;
}

export enum ItemType{
  FILE = 1,
  FOLDER = 2
}

