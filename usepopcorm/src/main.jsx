import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'

import SterRating from "./SterRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SterRating maxRating={5} />
    <SterRating maxRating={10} />
    <SterRating />
  </StrictMode>
);
