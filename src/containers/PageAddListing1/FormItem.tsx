import Label from "components/Label/Label";
import React from "react";
import { FC } from "react";

export interface FormItemProps {
  className?: string;
  label?: string;
  desc?: string;
  children?: React.ReactNode;
  invalid?: boolean,
}

const FormItem: FC<FormItemProps> = ({
  children,
  className = "",
  label,
  desc,
  invalid,
}) => {
  return (
    <div className={className}>
      {label && <Label className={`${invalid ? '!text-red-600' : ''} `}>{label}</Label>}
      <div className="mt-1">{children}</div>
      {desc && (
        <span className="block mt-3 text-xs text-neutral-500 dark:text-neutral-400 ">
          {desc}
        </span>
      )}
    </div>
  );
};

export default FormItem;
