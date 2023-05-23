import { Platform, StyleSheet, View } from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { ThemeProvider } from "@rneui/themed";
import Navigation from "./Navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

//configure the amplify resources
Amplify.configure(awsExports);

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

export default function App() {
  return (
    <>
      {Platform.OS === "web" && <WebFontLoad />}
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.content}>
            <ThemeProvider>
              <Authenticator.Provider>
                <Authenticator>
                  <Navigation />
                </Authenticator>
              </Authenticator.Provider>
            </ThemeProvider>
          </View>
        </View>
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
