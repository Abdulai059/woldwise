import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { StrictMode, useState } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// ---------- FOR STAR RATING-----------

// import SterRating from "./SterRating";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <SterRating color="blue" maxRating={10} onSetRating={setMovieRating} />
//       <p>The movie was rated {movieRating} star</p>
//     </div>
//   );
// }

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/* <App /> */}
//     <SterRating
//       maxRating={5}
//       messages={["Terrible", "Bad", "Okey", "Good", "Amazing"]}
//     />
//     <SterRating size={24} ClassName="test" defaultRating={2} />
//     <Test />
//   </StrictMode>
// );
