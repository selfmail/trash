import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View } from "react-native";

const backgroundImage =
  process.env.EXPO_OS === "web" ? "backgroundImage" : "experimental_backgroundImage";

export function Glur({ direction }: { direction: "top" | "bottom" }) {
  return (
    <>
      {[50, 75, 100].map((falloff) => (
        <GlurLayer key={falloff} direction={direction} falloff={falloff} intensity={12} />
      ))}
    </>
  );
}

function GlurLayer({
  direction,
  falloff,
  intensity,
}: {
  direction: "top" | "bottom";
  falloff: number;
  intensity?: number;
}) {
  return (
    <MaskedView
      maskElement={
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "transparent",
            [backgroundImage]: `linear-gradient(to ${direction}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) ${falloff}%)`,
          }}
        />
      }
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 96,
      }}
    >
      <BlurView intensity={intensity} style={StyleSheet.absoluteFill} />
    </MaskedView>
  );
}
