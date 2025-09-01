import { Link } from "react-router-dom";
import StyleSheet from "./PageNav.module.css";
import Logo from "./Logo";


function PageNav() {
  return (
    <nav className={StyleSheet.nav}>
      <Logo />

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
