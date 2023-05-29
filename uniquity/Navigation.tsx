import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Chat from "./Pages/Chat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Pages/Home";
import { Header, Overlay, Text, Button, Icon } from "@rneui/themed";
import { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import Details from "./Pages/Details";
import { useColorScheme } from "react-native";
import AdminPromptManager from "./Pages/AdminPromptManager";
import { MaterialIcons } from "@expo/vector-icons";
const logo = require("./assets/logo-no-background.png");

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const AdminStack = createNativeStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} />
  </HomeStack.Navigator>
);
const ChatStackNavigator = () => (
  <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    <ChatStack.Screen name="Chat" component={Chat} />
  </ChatStack.Navigator>
);

const AdminStackNavigator = () => (
  <AdminStack.Navigator screenOptions={{ headerShown: false }}>
    <AdminStack.Screen name="Prompts" component={AdminPromptManager} />
  </AdminStack.Navigator>
);

export default function Navigation() {
  const [visible, toggleOverlay] = useState(false);
  const { user, signOut } = useAuthenticator();
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Overlay
        isVisible={visible}
        onBackdropPress={() => toggleOverlay((value) => !value)}
      >
        <Text style={styles.textPrimary}>Hello!</Text>
        <Text style={styles.textSecondary}>
          Welcome {user.attributes?.email}
        </Text>
        <Button
          icon={
            <Icon
              name="sign-out"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Sign Out"
          onPress={() => signOut()}
        />
      </Overlay>

      <Header
        backgroundColor="#000000"
        backgroundImageStyle={{
          resizeMode: "contain",
          width: "100%",
          marginTop: Platform.OS === "web" ? 0 : 50,
        }}
        backgroundImage={logo}
        rightComponent={{
          icon: "person",
          color: "#fff",
          onPress: () => toggleOverlay((value) => !value),
        }}
        barStyle="light-content"
      />

      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ChatStack"
          component={ChatStackNavigator}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
        {user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload["cognito:groups"].includes("Admin") ? (
          <Tab.Screen
            name="AdminStack"
            component={AdminStackNavigator}
            options={{
              tabBarLabel: "Admin",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  name="admin-panel-settings"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        ) : undefined}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
