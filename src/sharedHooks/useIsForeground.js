import { useEffect, useState } from "react";
import { AppState, AppStateStatus } from "react-native";

export default ( ): boolean => {
  const [isForeground, setIsForeground] = useState( true );

  useEffect( ( ) => {
    const onChange = ( state: AppStateStatus ): void => {
      setIsForeground( state === "active" );
    };
    const listener = AppState.addEventListener( "change", onChange );
    return ( ) => listener?.remove( );
  }, [setIsForeground] );

  return isForeground;
};
