import { Platform, StyleSheet, View } from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { ThemeProvider, createTheme, useThemeMode } from "@rneui/themed";
import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import { useEffect } from "react";
import "@azure/core-asynciterator-polyfill";

//configure the amplify resources
Amplify.configure(awsExports);

const theme = createTheme({
  lightColors: {
    primary: "#127436",
  },
  darkColors: {
    primary: "#127436",
  },
  mode: "light",
});

//This is injected for react-native-web to pick up the icons for rneui
const WebFontLoad = () => (
  <style type="text/css">{`
  @font-face {
    font-family: 'MaterialIcons';
    src: url(${require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf")}) format('truetype');
  }

  @font-face {
    font-family: 'FontAwesome';
    src: url(${require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf")}) format('truetype');
  }
`}</style>
);

const ThemedContainer = () => {
  const colorScheme = useColorScheme();
  const { setMode } = useThemeMode();

  useEffect(() => {
    setMode(colorScheme ? colorScheme : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Authenticator.Provider>
          <Authenticator>
            <Navigation />
          </Authenticator>
        </Authenticator.Provider>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <>
      {Platform.OS === "web" && <WebFontLoad />}
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <ThemedContainer />
        </ThemeProvider>
      </SafeAreaProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 550,
  },
});
