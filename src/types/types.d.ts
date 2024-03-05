export type CropsType = {
  id: number;
  name: string;
  seasons: string[];
  growth_days: number;
  regrowth_days: number;
  seed_price: number;
  price: number;
  price_wine: number;
  price_jelly: number;
  image: string;
};

export type FilterType = {
  name: string;
  label: string;
  value: boolean;
}