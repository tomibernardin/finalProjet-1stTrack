import {useState, useEffect} from "react"
import { motion } from "framer-motion"

const Cursor = ({cursorVariant}) => {


  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const pointerVariants = {
    default: {
      width: 48,
      height: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    },
    plus: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      transition: { type: "spring", mass: 1 },
      width: 80,
      height: 80
    }
  }

  return(
    <>
      <motion.div
        className="fixed top-0 left-0 z-[1000] bg-gradient-to-tr from-pink-400/30 to-violet-500/60 rounded-full pointer-events-none"
        animate={cursorVariant}
        variants={pointerVariants}
      />
    </>

  )
}

export default Cursor
