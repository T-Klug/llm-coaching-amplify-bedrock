import { ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import { /*API,*/ DataStore } from "aws-amplify";
//import { GraphQLQuery } from "@aws-amplify/api";
import { useEffect, useState } from "react";
//import { CreateOpenAIChatFuncMutation } from "../graphql/API";
//import { createOpenAIChatFunc } from "../graphql/mutations";
import { LazyOpenAIChat, OpenAIChat } from "../models";
import { Text } from "@rneui/themed";

export default function Chat() {
  const [data, setData] = useState<LazyOpenAIChat[]>();
  useEffect(() => {
    const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
      setData(items)
    );
    return () => sub.unsubscribe();
  }, []);
  // useEffect(() => {
  //   const asyncFunction = async () => {
  //     const newChat = await API.graphql<
  //       GraphQLQuery<CreateOpenAIChatFuncMutation>
  //     >({
  //       query: createOpenAIChatFunc,
  //     });
  //     console.log(newChat);
  //   };
  //   asyncFunction().catch(console.error);
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <Text>{data?.map((d) => d.messages?.map((m) => m?.content))}</Text>
      <Input
        placeholder="Comment"
        rightIcon={{
          type: "font-awesome",
          name: "send",
        }}
      />
    </ScrollView>
  );
}
