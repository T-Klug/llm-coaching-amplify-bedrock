import { ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { useEffect } from "react";
import {
  CreateOpenAIChatFuncInput,
  CreateOpenAIChatFuncMutation,
  OpenAIRoleType,
} from "../graphql/API";
import { createOpenAIChatFunc } from "../graphql/mutations";

export default function Chat() {
  useEffect(() => {
    const newChatInput: CreateOpenAIChatFuncInput = {
      messages: [{ content: "stuff", role: OpenAIRoleType.USER }],
    };
    const asyncFunction = async () => {
      const newChat = await API.graphql<
        GraphQLQuery<CreateOpenAIChatFuncMutation>
      >({
        query: createOpenAIChatFunc,
        variables: { input: newChatInput },
      });
      console.log(newChat);
    };
    asyncFunction().catch(console.error);
  }, []);

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
