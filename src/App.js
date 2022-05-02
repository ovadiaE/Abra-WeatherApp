import React from 'react';
import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Bookkeeping</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/Homepage">HomePage</Link> |{" "}
        <Link to="/Favorites">Favorites</Link>
      </nav>
    </div>
  )
}

export default App;
