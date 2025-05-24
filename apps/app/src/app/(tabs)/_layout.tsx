import { View } from "@/src/components/Themed";
import { TabBar } from "@/src/components/layout/tabbar";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { useColorScheme } from "@/src/components/useColorScheme";
import Colors from "@/src/constants/Colors"; 
import * as Haptics from "expo-haptics";
import { Tabs } from "expo-router";
import type React from "react";
import { Pressable } from "react-native";

import Feather from "@expo/vector-icons/Feather";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => (
        <TabBar activeIndex={props.state.index} tabCount={props.state.routes.length}>
          <Pressable
            hitSlop={10}
            style={{
              padding: 10,
              borderRadius: 14,
              zIndex: 1, 
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              props.navigation.navigate("index");
            }}
          >
            <Feather name="home" size={20} color="white" />
          </Pressable>
          <View style={{ width: 20 }} />
          <Pressable
            hitSlop={10}
            style={{
              padding: 10,
              borderRadius: 14,
              zIndex: 1,
            }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
              props.navigation.navigate("settings");
            }}
          >
            <Feather name="settings" size={20} color="white" />
          </Pressable>
        </TabBar>
      )}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  );
}