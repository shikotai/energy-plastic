import energyPlasticLogo from "../../assets/energy-plastic-logo.png";
import "./BrandLogo.css";

type BrandLogoProps = {
  className?: string;
  surface?: "light" | "dark";
};

const BrandLogo = ({ className = "", surface = "light" }: BrandLogoProps) => (
  <span className={["brand-logo", `brand-logo--${surface}`, className].filter(Boolean).join(" ")}>
    <img src={energyPlasticLogo} alt="Energy Plastic" />
  </span>
);

export default BrandLogo;
