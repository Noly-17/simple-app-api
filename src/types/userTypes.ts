// User interface.
export interface User {
  id: number;
  name: string;
  password: string;
  email: string;
  role: string;
}

export interface ILogin {
  email: string | null;
  password: string | null;
}
