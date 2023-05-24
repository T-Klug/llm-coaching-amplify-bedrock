import { Text, Button, Icon } from "@rneui/themed";
import { API } from "aws-amplify";
import { useEffect, useState } from "react";
import { View } from "react-native";

const API_INFO = {
  name: "apiOpenAI",
  path: "/openai",
  init: {
    headers: {},
  },
};

export default function Details({ navigation }: { navigation: any }) {
  const [apiResponse, setApiResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(
        API_INFO.name,
        API_INFO.path,
        API_INFO.init
      );
      setApiResponse(response);
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{apiResponse}</Text>
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
