import React from "react";

const WelcomeComponent: React.FC<IWelcomeProps> = ({
  welcomeText,
  createAccountText,
  haveNotAccountText,
  hereText,
  bgcolor,
  link,
}) => {
  const tailsClass =
    "welcome-container flex flex-col items-center col-span-1 justify-evenly ";

  return (
    <div className={tailsClass + bgcolor}>
      <div className="welcome-text text-center">
        <p className="welcome uppercase text-sky-800">{welcomeText}</p>
        <p className="create-account-text text-xs">{createAccountText}</p>
      </div>
      <div className="register-here text-center">
        <p className="have-not-account-text">{haveNotAccountText}</p>
        <a href={link} className="register-here-text text-sky-800">
          {hereText}
        </a>
      </div>
    </div>
  );
};

export default WelcomeComponent;
