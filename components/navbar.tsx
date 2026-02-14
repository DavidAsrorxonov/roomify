import { Box } from "lucide-react";
import React from "react";

const Navbar = () => {
  const isSignedIn = false;
  const username = "david";

  const handleAuthClick = async () => {
    // later implement auth
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>

          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>

        <div className="actions">
          {isSignedIn ? (
            <span className="greeting">
              {username ? `Hello, ${username}!` : "Hello!"}
            </span>
          ) : (
            <>
              <button onClick={handleAuthClick} className="login">
                Log in
              </button>

              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
