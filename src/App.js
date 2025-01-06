import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import UrlShortener from "./UrlShortner/UrlShortner";
import Analysis from "./Analysis/Analysis";

function App() {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleButtonClick = () => {
    setShowAnalysis((prev) => !prev);
  };
 

  return (
    <div className="container">
      <div className="main-box">
        <div className="button-container">
          <button className="toggle-button" onClick={handleButtonClick}>
            {showAnalysis ? "Get Shorten URL" : "Get Analysis"}
          </button>
        </div>
        <div className="content-container">
          {showAnalysis ? (
            <div className="analysis-box">
             <Analysis/>
            </div>
          ) : (
            <div>
                <UrlShortener />
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;
