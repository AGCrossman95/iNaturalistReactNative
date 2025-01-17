// @flow

import type { Node } from "react";
import React, { useEffect } from "react";
import { Animated } from "react-native";

type Props = {
  tappedCoordinates: Object,
  singleTapToFocusAnimation: any
}

const FocusSquare = ( { tappedCoordinates, singleTapToFocusAnimation }: Props ): Node => {
  useEffect( ( ) => {
    if ( tappedCoordinates ) {
      Animated.timing(
        singleTapToFocusAnimation,
        {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        }
      ).start( );
    }
  }, [singleTapToFocusAnimation, tappedCoordinates] );

  if ( !tappedCoordinates ) { return null; }

  const HALF_SIZE_FOCUS_BOX = 40;

  return (
    // $FlowIgnore
    <Animated.View
      className="w-16 h-16 absolute border border-white rounded-lg"
      style={[{
        left: tappedCoordinates.x - HALF_SIZE_FOCUS_BOX,
        top: tappedCoordinates.y - HALF_SIZE_FOCUS_BOX,
        opacity: singleTapToFocusAnimation
      }
      ]}
    />
  );
};

export default FocusSquare;
