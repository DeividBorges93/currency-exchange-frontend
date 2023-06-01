interface IError {
  code: number;
  message: string;
}

interface IUserWithUsername {
  username: string;
  password: string;
}

interface IUserWithEmail {
  email: string;
  password: string;
}

interface IInputProps {
  type: "text" | "password" | "email";
  id: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IButtonProps {
  id: string;
  type: "button" | "submit" | "reset";
  value: string;
  bgcolordisabled: string;
}

interface IWelcomeProps {
  welcomeText: string;
  createAccountText: string;
  haveNotAccountText: string;
  hereText: string;
  bgcolor: string;
  link: string;
}
