// export type Result = {
//   success: string;
//   error: null | string | boolean;
//   body?:
//     | {
//         message: string;
//       }
//     | undefined
//     | null;
// };

export type Result = {
  data?: any;
  error?: string;
  message?: string;
  meta?: IMeta;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type SignUpFormType = {
  email: string;
  password: string;
  full_name: string;
};

export interface IAdmin {
  username: string;
  name: string;
  email: string;
  password: string;
  type: "admin" | "user";
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  city: string;
  type: "publisher" | "advertiser" | string;
  unique_audience: number;
  available_impressions: number;
  minimum_budget: number;
  financial_total: number;
  last_online: string;
  legal_requirements: string[];
  is_verified: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface IMeta {
  current_page: number;
  page_items: number;
  total_items: number;
  total_pages: number;
}

export interface IColumn {
  name: string;
  uid: string;
}
