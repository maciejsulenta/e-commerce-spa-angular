export interface FilterParams {
  page: string;
  filters: {
    type: string;
    value: string;
  }[];
}
