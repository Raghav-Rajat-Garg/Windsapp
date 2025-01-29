import React, { useState } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={styles.searchContainer}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isFocused ? "#299b81" : "#8696a0"} // Change color dynamically
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          ...styles.searchIcon,
          transform: isFocused ? "rotate(90deg)" : "rotate(0deg)", // Rotate on focus
          transition: "transform 0.3s ease, stroke 0.3s ease", // Smooth transition
        }}
      >
        {isFocused ? (
          // Arrow icon when focused
          <polyline points="5 12 12 18 19 12" />
        ) : (
          // Search icon when unfocused
          <>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </>
        )}
      </svg>
      <input
        type="text"
        placeholder="Search"
        style={styles.searchInput}
        onFocus={() => setIsFocused(true)} // Trigger focus state
        onBlur={() => setIsFocused(false)} // Reset on blur
      />
    </div>
  );
};

const styles = {
  searchContainer: {
    backgroundColor: "#202c33",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    width: "416px",
    height: "35px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
    marginLeft: "5px",
    marginTop: "-20px"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    color: "white",
    outline: "none",
    fontSize: "14px",
    flex: 1,
  },
};

export default SearchBar;
