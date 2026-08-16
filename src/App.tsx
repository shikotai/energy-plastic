import { BrowserRouter, Route, Routes } from "react-router-dom";

import SiteLayout from "./components/Layout/SiteLayout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import About from "./pages/About/About";
import Contacts from "./pages/Contacts/Contacts";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import NotFound from "./pages/NotFound/NotFound";
import Project from "./pages/Project/Project";
import Solutions from "./pages/Solutions/Solutions";
import Team from "./pages/Team/Team";
import Technology from "./pages/Technology/Technology";

const configuredBase = import.meta.env.BASE_URL.replace(/\/$/, "");
const basename = configuredBase || undefined;

const App = () => (
  <BrowserRouter basename={basename}>
    <ScrollToTop />
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="technology" element={<Technology />} />
        <Route path="solutions" element={<Solutions />} />
        <Route path="project" element={<Project />} />
        <Route path="team" element={<Team />} />
        <Route path="news" element={<News />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
