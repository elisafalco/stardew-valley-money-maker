"use client";

import "./checkbox.scss";

type CheckboxProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Checkbox({
  id,
  name,
  label,
  checked,
  onChange,
}: CheckboxProps) {
  return (
    <div className="a-checkbox">
      <div className={checked ? "a-checkbox__box -checked" : "a-checkbox__box"}>
        <input
          className="a-checkbox__input"
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      </div>
      <label className="a-checkbox__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
