import { ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import { ListSystemPromptsQuery } from "../graphql/API";
import { API } from "aws-amplify";
import { GraphQLQuery, graphqlOperation } from "@aws-amplify/api";
import { listSystemPrompts } from "../graphql/queries";
import { useEffect, useState } from "react";

export default function AdminPromptManager() {
  const [prompt, setPrompt] = useState<string[] | null | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.graphql<GraphQLQuery<ListSystemPromptsQuery>>(
        graphqlOperation(listSystemPrompts)
      );
      if (
        response.data?.listSystemPrompts?.items &&
        response.data.listSystemPrompts.items.length > 0
      ) {
        setPrompt(response.data.listSystemPrompts.items[0]?.prompts);
      }
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <ScrollView>
      {prompt?.map((p) => (
        <Input value={p} />
      ))}
    </ScrollView>
  );
}
