import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  selectedValue: string;
  children: React.ReactNode;
}

export default function Select({ label, name, selectedValue, children, ...props }: SelectProps) {
  return (
    <div className={`flex gap-[10px] items-center`}>
      {label && <label htmlFor={label}>{label}</label>}
      <select className={`p-1 w-[100px] border`} id={label ?? name} name={name} value={selectedValue} {...props}>
        {children}
      </select>
    </div>
  );
}

Select.Option = function SelectOption({ value }: { value: string }) {
  return <option value={value}>{value}</option>;
};
