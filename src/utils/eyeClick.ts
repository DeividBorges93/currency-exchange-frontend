export default async () => {
  const inputPassword = document.getElementById("password") as HTMLInputElement;

  const imgShowPassword = document.getElementById(
    "show-password"
  ) as HTMLImageElement;
  const inputTypeIsPassword = inputPassword.type === "password";

  const showPassword = async () => {
    inputPassword.setAttribute("type", "text");
    imgShowPassword.setAttribute("src", "src/assets/closed-eye.png");
  };

  const hidePassword = async () => {
    inputPassword.setAttribute("type", "password");
    imgShowPassword.setAttribute("src", "src/assets/open-eye.png");
  };

  if (inputTypeIsPassword) {
    showPassword();
  } else {
    hidePassword();
  }
};
