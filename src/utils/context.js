import React, { createContext, useState } from "react";

// Create a new context
export const ArticleContext = createContext();
export const BodyScrollContext = createContext();
export const BodyPosContext = createContext();
export const AppProvider = ({ children }) => {
  const [page, setPage] = useState({});
  return (
    <ArticleContext.Provider value={{ page, setPage }}>
      {children}
    </ArticleContext.Provider>
  );
};

export const BodyScrollProvider = ({ children }) => {
  const [bodyScroll, setBodyScroll] = useState(false);
  return (
    <BodyScrollContext.Provider value={{ bodyScroll, setBodyScroll }}>
      {children}
    </BodyScrollContext.Provider>
  );
};

export const BodyPosProvider = ({ children }) => {
  const [bodyPos, setBodyPos] = useState(0);
  return (
    <BodyPosContext.Provider value={{ bodyPos, setBodyPos }}>
      {children}
    </BodyPosContext.Provider>
  );
};
