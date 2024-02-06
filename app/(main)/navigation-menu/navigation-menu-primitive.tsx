import { useDrawerStatus } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as NavigationMenu from "~/lib/rn-primitives/navigation-menu";

export default function MenubarPrimitiveScreen() {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const [value, setValue] = React.useState<string>();
  const navigation = useNavigation();
  const isDrawerOpen = useDrawerStatus() === "open";

  function closeAll() {
    setValue("");
  }

  React.useEffect(() => {
    const sub = navigation.addListener("blur", () => {
      closeAll();
    });

    return sub;
  }, []);

  React.useEffect(() => {
    if (isDrawerOpen) {
      closeAll();
    }
  }, [isDrawerOpen]);

  return (
    <>
      {!!value && (
        <Pressable
          onPress={() => {
            setValue("");
          }}
          style={StyleSheet.absoluteFill}
          className="absolute bg-red-500"
        />
      )}
      <View
        className="items-center justify-center flex-1 gap-12 p-6"
        style={{ pointerEvents: "box-none" }}
      >
        <NavigationMenu.Root
          onValueChange={setValue}
          value={value}
          className="flex-row items-center p-0.5 gap-5 z-50 bg-blue-500"
        >
          <NavigationMenu.List className="flex-row items-center gap-5">
            <NavigationMenu.Item value="learn" className="bg-background">
              <NavigationMenu.Trigger>
                <Text className="text-xl text-foreground">Learn</Text>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Content
                  insets={contentInsets}
                  className="absolute bg-blue-500"
                >
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">Stiches</Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">Colors</Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">Icons</Text>
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="overview" className="bg-background">
              <NavigationMenu.Trigger>
                <Text className="text-xl text-foreground">Overview</Text>
              </NavigationMenu.Trigger>
              <NavigationMenu.Portal>
                <NavigationMenu.Content
                  insets={contentInsets}
                  className="absolute bg-blue-500"
                >
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">
                      Introduction
                    </Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">
                      Getting Started
                    </Text>
                  </NavigationMenu.Link>
                  <NavigationMenu.Link asChild onPress={closeAll}>
                    <Text className="text-xl text-foreground">Styling</Text>
                  </NavigationMenu.Link>
                </NavigationMenu.Content>
              </NavigationMenu.Portal>
            </NavigationMenu.Item>
            <NavigationMenu.Item value="terminal" className="bg-background">
              <NavigationMenu.Link onPress={closeAll} className="z-50">
                <Text className="text-xl text-foreground">Github</Text>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </View>
    </>
  );
}
