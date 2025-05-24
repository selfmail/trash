import { BlurView } from "expo-blur";
import React from "react";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ABlurView = Animated.createAnimatedComponent(BlurView);

export const AnimateInBlur = React.forwardRef(
  ({ intensity = 50, ...props }: any, ref) => {
    const sharedValue = useSharedValue(0);

    React.useEffect(() => {
      sharedValue.value = withTiming(intensity, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      });
    }, [intensity, sharedValue]);

    React.useImperativeHandle(ref, () => ({
      animateToZero: () => {
        return new Promise<void>((resolve) => {
          sharedValue.value = withTiming(
            0,
            { duration: 100, easing: Easing.out(Easing.exp) },
            () => runOnJS(resolve)()
          );
        });
      },
    }));

    const animatedProps = useAnimatedProps(() => ({
      intensity: sharedValue.value,
    }));

    return <ABlurView {...props} animatedProps={animatedProps} />;
  }
);
