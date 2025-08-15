import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
// import App from './App.jsx'

import SterRating from "./SterRating";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SterRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <SterRating size={24} ClassName="test" />
  </StrictMode>
);
