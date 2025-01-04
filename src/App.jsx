import React from "react";
import WeatherApp from "./component/WeatherApp";

function App() {
  return (
    <div className=" h-screen flex items-center justify-center bg-gradient-to-b from-[#79D7BE] to-[#F6F4F0] font-poppins max-sm:w-screen max-sm:h-screen">
      <WeatherApp />
    </div>
  );
}

export default App;
