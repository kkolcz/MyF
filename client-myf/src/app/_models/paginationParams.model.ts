export interface IPaginationParams {
  page: string;
  pageSize: string;
  filter: string;
}

export interface IPaginationRes {
  page: number;
  pageSize: number;
}
