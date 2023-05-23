import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Chat() {
  const { signOut, user } = useAuthenticator();
  return (
    <ScrollView>
      <Text>Welcom to Chat Page: {user.attributes?.email}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
