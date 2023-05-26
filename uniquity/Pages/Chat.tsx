import { ScrollView } from "react-native";
import { Input } from "@rneui/themed";

export default function Chat() {
  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Input
        placeholder="Comment"
        rightIcon={{ type: "font-awesome", name: "send" }}
      />
    </ScrollView>
  );
}
