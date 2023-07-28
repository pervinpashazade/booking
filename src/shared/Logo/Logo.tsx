import React from "react";
import { Link } from "react-router-dom";
import LogoSvgLight from "./LogoSvgLight";
import LogoSvg from "./LogoSvg";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  className = "w-24",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
      <div className="hidden dark:block">
        <LogoSvgLight />
      </div>
      <div className="block dark:hidden">
        <LogoSvg />
      </div>
    </Link>
  );
};

export default Logo;
