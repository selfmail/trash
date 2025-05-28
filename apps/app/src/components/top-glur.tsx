import Masked from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { useReanimatedHeaderHeight } from "react-native-screens/reanimated";


const AnimMask = Animated.createAnimatedComponent(Masked);
export function GlurItem({ direction, style }: { direction: "top" | "bottom", style: any }) {

    return (
      <AnimMask
        maskElement={
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "transparent",
                experimental_backgroundImage: `linear-gradient(to ${direction}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 75%)`,
              },
              style,
            ]}
          />
        }
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: 96,
        }}
      >
        <BlurView
          intensity={100}
          tint={"systemChromeMaterial"}
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            position: "absolute",
          }}
        />
      </AnimMask>
    );
  }