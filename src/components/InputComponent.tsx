import React from "react";

const InputComponent: React.FC<
  IInputProps & { inputRef: React.Ref<HTMLInputElement> }
> = ({ label, id, type, onChange, inputRef }) => {
  return (
    <div className="wrap-input px-8 py-2.5">
      <p className="title-input text-xs pb-2">{label}</p>
      <input
        id={id}
        type={type}
        className="rounded-md border focus:outline-none focus:ring-0 focus:border-solid focus:border focus:border-sky-500 drop-shadow-lg shadow-black px-1"
        onChange={onChange}
        ref={inputRef}
      />
    </div>
  );
};

export default InputComponent;
