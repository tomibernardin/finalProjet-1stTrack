import { AnimatePresence, motion } from "framer-motion";
import React, { createContext, useContext, useState } from "react";
import { FetchRoutes } from "../guard/Routes";

const loadingViewContext = createContext(null);

const useLoadingViewContext = () => useContext(loadingViewContext);

const statusEnum = {
    LOADING : 'LOADING',
    ERROR : 'ERROR',
    OK : 'OK'
}

function LoadingViewProvider({ children }) {
    
  const [status, setStatus] = useState(statusEnum.LOADING);

  function startLoading(){
    setStatus(statusEnum.LOADING)
  }

  const loadDone = () => setStatus(statusEnum.OK);

  function triggerError(){
    setStatus(statusEnum.ERROR)
  }

  return (
    <loadingViewContext.Provider
      value={{
        status,
        startLoading,
        loadDone,
        triggerError
      }}
    > 
        {children}
        <AnimatePresence  initial={false} mode="wait">
            {status === statusEnum.LOADING &&
                <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] bg-white flex items-center justify-center"
                >
                <img 
                    src={`${FetchRoutes.BUCKET}/logo/logo_square.svg`}
                    alt="logo_square"
                    className="w-[25vw] max-w-[150px] animate-pulse"
                />
            </motion.div>}
        </AnimatePresence>

    </loadingViewContext.Provider>
  );
}
export { loadingViewContext, LoadingViewProvider, useLoadingViewContext };
