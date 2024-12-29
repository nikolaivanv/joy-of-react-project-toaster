import React from "react";

const useEscapeKey = (callback) => {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Escape") {
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [callback]);
};

export default useEscapeKey;
