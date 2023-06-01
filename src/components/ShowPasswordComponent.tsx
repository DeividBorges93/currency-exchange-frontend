import React from "react";

import eyeClick from "../utils/eyeClick";

const ShowPasswordComponent = () => {
  return (
    <div className="show-password px-9 py-2.5">
      <img
        className="w-5 hover:cursor-pointer"
        id="show-password"
        src="src/assets/open-eye.png"
        alt="show password"
        onClick={eyeClick}
      />
    </div>
  );
};

export default ShowPasswordComponent;
