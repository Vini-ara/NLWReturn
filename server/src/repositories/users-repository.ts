export interface UserCreateData {
  name: string;
  email: string;
  role?: string;
  password: string;
}

export interface GetUser {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<void>;
  getUserByEmail: (email: string) => Promise<GetUser | null>;
}
