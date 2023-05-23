import { Text, Button, Icon } from "@rneui/themed";
import { View } from "react-native";

export default function Details({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Details</Text>
      <Button
        icon={
          <Icon
            name="arrow-left"
            type="font-awesome"
            color="white"
            size={25}
            iconStyle={{ marginRight: 10 }}
          />
        }
        title="Back"
        onPress={() => navigation.pop()}
      />
    </View>
  );
}
