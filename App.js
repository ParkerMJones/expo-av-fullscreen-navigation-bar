import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable, Text } from "react-native";
import React, { useRef, useState } from "react";
import { Video, ResizeMode } from "expo-av";
import * as NavigationBar from "expo-navigation-bar";
import * as ScreenOrientation from "expo-screen-orientation";
import { setStatusBarHidden } from "expo-status-bar";

export default function App() {
  const videoRef = useRef(null);
  const visibility = NavigationBar.useVisibility();

  React.useEffect(() => {
    if (visibility === "visible") {
      const interval = setTimeout(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, /* 3 Seconds */ 3000);

      return () => {
        clearTimeout(interval);
      };
    }
  }, [visibility]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Video
        ref={videoRef}
        useNativeControls
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        }}
        shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        style={{
          width: "100%",
          height: 300,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onFullscreenUpdate={async (e) => {
          console.log(e.fullscreenUpdate);
          if (e.fullscreenUpdate === 0 || e.fullscreenUpdate === 1) {
            await ScreenOrientation.unlockAsync();
            NavigationBar.setPositionAsync("absolute");
            NavigationBar.setVisibilityAsync("hidden");
            NavigationBar.setBehaviorAsync("overlay-swipe");
            NavigationBar.setBackgroundColorAsync("#00000080"); // `rgba(0,0,0,0.5)`
            setStatusBarHidden(true, "none");
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
