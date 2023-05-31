import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Icon, Input, ListItem, Overlay } from "@rneui/themed";
import { API, DataStore } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { useCallback, useState } from "react";
import { CreateOpenAIChatFuncMutation } from "../graphql/API";
import { createOpenAIChatFunc } from "../graphql/mutations";
import {
  LazyMessagesType,
  LazyOpenAIChat,
  OpenAIChat,
  OpenAiRoleType,
} from "../models";
import { Text } from "@rneui/themed";
import { useFocusEffect } from "@react-navigation/native";

export default function Chat({ navigation }: { navigation: any }) {
  const [data, setData] = useState<LazyOpenAIChat[]>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      if (!selectedId) setOverlayVisible(true);
      const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
        setData(items)
      );
      return () => sub.unsubscribe();
    }, [selectedId])
  );

  const BuildListItem = (
    id: string,
    messages: (LazyMessagesType | null)[] | null | undefined
  ) => {
    return (
      <ListItem containerStyle={{ marginTop: 10, borderRadius: 8 }}>
        <ListItem.Content>
          <ListItem.Title>
            {messages && messages[messages?.length - 1]?.content}
          </ListItem.Title>
        </ListItem.Content>
        <Icon
          name="arrow-right"
          type="FontAwesome"
          size={30}
          color="white"
          onPress={() => {
            setSelectedId(id);
            setOverlayVisible(false);
          }}
        />
      </ListItem>
    );
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{ margin: 10, borderRadius: 8, maxHeight: 600 }}
      >
        <Text style={styles.textSecondary}>
          Select a previous chat or start a new chat
        </Text>
        <ScrollView style={{ height: "85%" }}>
          {data?.map((d) => BuildListItem(d.id, d.messages))}
        </ScrollView>
        <Button
          style={{ marginTop: 10 }}
          icon={
            <Icon
              name="chat"
              type="MaterialIcons"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          loading={loading}
          title="New Chat"
          onPress={async () => {
            setLoading(true);
            const response = await API.graphql<
              GraphQLQuery<CreateOpenAIChatFuncMutation>
            >({
              query: createOpenAIChatFunc,
            });
            setSelectedId(response.data?.createOpenAIChatFunc?.id);
            setOverlayVisible(false);
          }}
        />
        <Button
          style={{ marginTop: 10 }}
          icon={
            <Icon
              name="arrow-back"
              type="MaterialIcons"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          loading={loading}
          title="Back"
          onPress={() => {
            navigation.navigate("HomeStack");
            setOverlayVisible(false);
          }}
        />
      </Overlay>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        {data &&
          data?.length > 0 &&
          data.find((s) => s.id === selectedId) &&
          data
            .find((x) => x.id === selectedId)!
            .messages?.map((m, index) => {
              if (m?.role === OpenAiRoleType.ASSISTANT)
                return (
                  <View key={m.role + index} style={styles.whiteBubble}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#000",
                        justifyContent: "center",
                      }}
                    >
                      {m.content}
                    </Text>
                  </View>
                );
              if (m?.role === OpenAiRoleType.USER)
                return (
                  <View key={m.role + index} style={styles.blueBubble}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#fff",
                        justifyContent: "center",
                      }}
                    >
                      {m.content}
                    </Text>
                  </View>
                );
            })}

        <Input
          containerStyle={{ marginTop: 50 }}
          placeholder="Chat"
          rightIcon={{
            type: "font-awesome",
            name: "arrow-circle-up",
            color: "#0A84FF",
          }}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  whiteBubble: {
    backgroundColor: "#dedede",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: "5%",
    maxWidth: "50%",
    alignSelf: "flex-start",
  },

  blueBubble: {
    backgroundColor: "#0078fe",
    padding: 10,
    marginLeft: "45%",
    borderRadius: 5,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: "50%",
    alignSelf: "flex-end",
  },

  button: {
    margin: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
