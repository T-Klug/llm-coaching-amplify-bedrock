import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Input } from "@rneui/themed";

export default function Chat() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 40,
      }}
    >
      <Input
        placeholder="Comment"
        rightIcon={{ type: "font-awesome", name: "send" }}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
