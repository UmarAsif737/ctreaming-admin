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
  username: string
  name: string
  email: string
  password: string
  type: 'admin' | 'user'
}