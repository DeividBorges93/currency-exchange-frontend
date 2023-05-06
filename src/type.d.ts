interface IError {
  code: number;
  message: string;
};

interface IUserWithUsername {
  username: string;
  password: string;
};

interface IUserWithEmail {
  email: string;
  password: string;
};