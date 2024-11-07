export interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  // in the futrue the will need to have an id: string;
}

export type AxiosUserResponse = {
  data: User;
};
