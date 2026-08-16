import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";
import NavigationHeader from "../NavigationHeader/NavigationHeader";

const SiteLayout = () => (
  <div className="site-shell">
    <NavigationHeader />
    <Outlet />
    <Footer />
  </div>
);

export default SiteLayout;
