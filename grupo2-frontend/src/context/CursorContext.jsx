// context to handle cursor 

import { createContext, useContext, useState } from 'react'
import Cursor from '../components/cursor/Cursor';
import useWindowDimensions from '../hooks/useWindowDimensions';

export const CursorContext = createContext(null)

export const useCursorContext = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
    const [cursorVariant, setCursorVariant] = useState('default')
    
    const setCursor = (variant) => {
        setCursorVariant(variant)
    }

    const {height, width} = useWindowDimensions();
    
    
    return (
        <CursorContext.Provider value={{ cursorVariant, setCursor }}>
            {children}
            {height && width && height > 600 && width > 1200 && 
                <Cursor cursorVariant={cursorVariant}  />
            }
        </CursorContext.Provider>
    )
}

