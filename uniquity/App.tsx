import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import Content from "./Pages/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Chat from "./Pages/Chat";
import { ThemeProvider } from "@rneui/themed";

//configure the amplify resources
Amplify.configure(awsExports);

const Tab = createBottomTabNavigator();

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
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ThemeProvider>
            <Authenticator.Provider>
              <Authenticator>
                <NavigationContainer>
                  <Tab.Navigator>
                    <Tab.Screen
                      name="Home"
                      component={Content}
                      options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons
                            name="home"
                            color={color}
                            size={size}
                          />
                        ),
                      }}
                    />
                    <Tab.Screen
                      name="Chat"
                      component={Chat}
                      options={{
                        tabBarLabel: "Chat",
                        tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons
                            name="chat"
                            color={color}
                            size={size}
                          />
                        ),
                      }}
                    />
                  </Tab.Navigator>
                </NavigationContainer>
              </Authenticator>
            </Authenticator.Provider>
          </ThemeProvider>
        </View>
      </SafeAreaView>
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
