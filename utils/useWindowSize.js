import React, { useLayoutEffect, useState } from "react";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  const docElement = document.documentElement;
  useLayoutEffect(() => {
    function updateSize() {
      setSize([docElement.clientWidth, docElement.clientHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default useWindowSize;
