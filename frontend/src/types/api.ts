export type LoginResponse = {
    status: number,
    body: {
      authToken: string
    } & LoginError
};
  
export type LoginError = {
    status: string,
    message: string,
};
  