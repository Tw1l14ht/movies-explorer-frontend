import { useEffect, useState, useCallback} from "react";

export default function useWidth() {

const [screenWidth, setScreenWidth] = useState(
    document.documentElement.clientWidth
  );
  
  const handleResizeWidth = useCallback(() => {
    setScreenWidth(document.documentElement.clientWidth);
  }, [setScreenWidth]);

  useEffect(() => {
    let timer

    window.addEventListener('resize', resize);

    function resize() {
      if (!timer) {
        timer = null;
        timer = setTimeout(() => {
          handleResizeWidth();
        }, 1000);
      }
    }
    return () => window.removeEventListener('resize', resize);
  }, [handleResizeWidth, screenWidth]);

  return screenWidth;
}