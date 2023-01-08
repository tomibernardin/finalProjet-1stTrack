import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon } from "@heroicons/react/24/outline";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const ImageGallery = ({images}) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="h-[80vh] w-[80vw] relative overflow-hidde">
        <AnimatePresence initial={false} custom={direction}>
            <motion.img
            className="absolute top-0 left-0 w-full h-full object-contain"
            key={page}
            src={images[imageIndex].url}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
            }} 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
                }
            }}
            />
        </AnimatePresence>
        <button
        onClick={() => paginate(-1)}
        className='absolute left-0 top-0 h-full w-16 z-10
        flex items-center justify-center'>
            <ChevronLeftIcon className='w-12 h-12 text-white drop-shadow-sm' />
        </button>
        <button 
        onClick={() => paginate(1)}
        className='absolute right-0 top-0 h-full w-16 z-10
        flex items-center justify-center'>
            <ChevronRightIcon className='w-12 h-12 text-white drop-shadow-sm' />
        </button>
      </div>
      <div className="flex items-center justify-center w-[80vw] h-[10vh] gap-4">
        {
          images.map((image, i) => (
            <picture
            key={i}
            className="h-full rounded-lg shadow-lg overflow-hidden relative">
              <img className={`h-full`} 
              alt={image.description}
              src={image.url}
              onClick={() => setPage([i, i])}
              />
              {i === imageIndex &&
              <div className="absolute top-0 left-0 
              w-full h-full bg-black/40 flex items-center justify-center">
                <EyeIcon className="w-10 h-10 text-white" />
              </div>
              }
            </picture>
          ))
        }
    </div>
    </>
  );
};