import Button, { ButtonProps } from "shared/Button/Button";
import React from "react";

export interface ButtonSecondaryProps extends ButtonProps {}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary font-medium border bg-white border-red-200 text-white-700 dark:bg-red-900 dark:text-white-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
