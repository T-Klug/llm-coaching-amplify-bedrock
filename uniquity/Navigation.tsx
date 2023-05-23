import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Chat from "./Pages/Chat";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Pages/Home";
import { Header, Overlay, Text, Button, Icon } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import Details from "./Pages/Details";

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();

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

export default function Navigation() {
  const [visible, toggleOverlay] = useState(false);
  const { user, signOut } = useAuthenticator();
  return (
    <NavigationContainer>
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
        leftComponent={{
          icon: "menu",
          color: "#fff",
        }}
        rightComponent={{
          icon: "person",
          color: "#fff",
          onPress: () => toggleOverlay((value) => !value),
        }}
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
