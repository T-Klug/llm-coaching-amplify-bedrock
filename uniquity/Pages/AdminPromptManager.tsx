import { Alert, Platform, ScrollView } from "react-native";
import { Button, Input } from "@rneui/themed";
import { DataStore } from "aws-amplify";
import { useEffect, useState } from "react";
import { LazySystemPrompt, SystemPrompt } from "../models";

export default function AdminPromptManager() {
  const [data, setData] = useState<LazySystemPrompt>();
  useEffect(() => {
    const sub = DataStore.observeQuery(SystemPrompt).subscribe(({ items }) =>
      setData(items[0])
    );
    return () => sub.unsubscribe();
  }, []);
  return (
    <ScrollView>
      <Input
        label="This is the Default System Prompt fed to the OpenAI during calls"
        multiline
        style={{ maxHeight: 700, minHeight: 500, padding: 10 }}
        inputContainerStyle={{ borderWidth: 1, margin: 10 }}
        containerStyle={{ marginTop: 10 }}
        value={data?.prompt}
        onChangeText={(text) => {
          setData(
            SystemPrompt.copyOf(data!, (draft) => {
              draft.prompt = text;
            })
          );
        }}
      />
      <Button
        style={{ margin: 20 }}
        onPress={async () => {
          if (!data) return;
          await DataStore.save(data);
          if (Platform.OS !== "web") {
            Alert.alert("Prompt saved!");
          } else {
            window.confirm("Prompt saved!");
          }
        }}
      >
        Save
      </Button>
    </ScrollView>
  );
}
