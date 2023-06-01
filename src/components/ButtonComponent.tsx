import React from "react";

const ButtonComponent: React.FC<IButtonProps> = ({
  id,
  type,
  value,
  bgcolordisabled,
}) => {
  const tailsClass =
    "bg-sky-600 hover:bg-sky-700 text-white py-2 px-8 rounded-md disabled:text-gray-400 ";

  return (
    <div className="container-form-btn text-center py-3.5">
      <button
        id={id}
        type={type}
        className={tailsClass + bgcolordisabled}
        disabled
      >
        {value}
      </button>
    </div>
  );
};

export default ButtonComponent;
