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
import { Header } from "@rneui/themed";
import { Platform } from "react-native";
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
  const { user } = useAuthenticator();
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Header
        containerStyle={{ minHeight: 50 }}
        backgroundColor="#000000"
        backgroundImageStyle={{
          resizeMode: "contain",
          marginTop: Platform.OS === "web" ? 0 : 50,
        }}
        backgroundImage={logo}
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
