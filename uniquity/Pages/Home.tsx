import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Home() {
  const { signOut, user } = useAuthenticator();
  return (
    <>
      <Text>Welcom to Home Page: {user.attributes?.email}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <StatusBar style="auto" />
    </>
  );
}
