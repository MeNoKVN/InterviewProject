import React, {createContext, useContext, useState, forwardRef, useImperativeHandle} from 'react';
import {StyleSheet, View} from 'react-native';

type PortalContextType = {
  mount: (children: React.ReactNode) => string;
  unmount: (id: string) => void;
};


const PortalContext = createContext<PortalContextType | null>(null);

export const PortalProvider = forwardRef(({children}: {children: React.ReactNode}, ref) => {
  const [portals, setPortals] = useState<Map<string, React.ReactNode>>(new Map());

  const mount = (children: React.ReactNode) => {
    const id = Math.random().toString();
    setPortals(prev => new Map(prev).set(id, children));
    return id;
  };

  const unmount = (id: string) => {
    setPortals(prev => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  useImperativeHandle(ref, () => ({
    mount,
    unmount
  }));

  return (
    <PortalContext.Provider value={{mount, unmount}}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {Array.from(portals.entries()).map(([id, element]) => (
          <React.Fragment key={id}>{element}</React.Fragment>
        ))}
      </View>
    </PortalContext.Provider>
  );
});

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
}; 