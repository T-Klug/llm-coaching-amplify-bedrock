import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Icon, Input, ListItem, Overlay } from "@rneui/themed";
import { API, DataStore } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";
import { useCallback, useRef, useState } from "react";
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
import { DotTypingAnimation } from "../dotsTyping";

export default function Chat({ navigation }: { navigation: any }) {
  const [data, setData] = useState<LazyOpenAIChat[]>();
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(true);
  const [chat, setChat] = useState<string>("");
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useFocusEffect(
    useCallback(() => {
      if (!selectedId) setOverlayVisible(true);
      const sub = DataStore.observeQuery(OpenAIChat).subscribe(({ items }) =>
        setData(items)
      );
      return () => sub.unsubscribe();
    }, [selectedId])
  );

  const submit = async () => {
    setChatLoading(true);
    setChat("");
    const model = data?.find((d) => d.id === selectedId);
    const saveModel = OpenAIChat.copyOf(model!, (draft) => {
      draft.messages?.push({ role: "USER", content: chat });
    });
    const functionInput = {
      id: saveModel.id,
      messages: saveModel.messages,
    };
    await API.graphql<GraphQLQuery<CreateOpenAIChatFuncMutation>>({
      query: createOpenAIChatFunc,
      variables: { input: functionInput },
    });
    setChatLoading(false);
  };

  const BuildListItem = (
    id: string,
    messages: (LazyMessagesType | null)[] | null | undefined
  ) => {
    return (
      <ListItem
        key={id}
        containerStyle={{ marginTop: 10, borderRadius: 8 }}
        onPress={() => {
          setSelectedId(id);
          setOverlayVisible(false);
        }}
      >
        <ListItem.Content>
          <ListItem.Title>
            {messages && messages[messages?.length - 1]?.content}
          </ListItem.Title>
        </ListItem.Content>
        <Icon name="arrow-right" type="FontAwesome" size={30} color="white" />
      </ListItem>
    );
  };

  return (
    <>
      <Overlay
        isVisible={overlayVisible}
        overlayStyle={{
          margin: 10,
          borderRadius: 8,
          maxHeight: 600,
          minWidth: 400,
          maxWidth: 400,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.textSecondary}>
            Select a previous chat or start a new chat
          </Text>
          <Icon
            name="close"
            type="MaterialIcons"
            size={25}
            onPress={() => {
              navigation.navigate("HomeStack");
              setOverlayVisible(false);
            }}
          />
        </View>
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
      </Overlay>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          onContentSizeChange={() => {
            if (scrollViewRef.current)
              scrollViewRef.current.scrollToEnd({ animated: true });
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
        </ScrollView>

        {chatLoading && (
          <DotTypingAnimation
            style={{ margin: 15 }}
            dotColor="white"
            dotRadius={6}
            dotMargin={8}
            dotSpeed={0.085}
          />
        )}
        <Input
          multiline
          numberOfLines={2}
          containerStyle={{ marginTop: 50 }}
          inputStyle={{ marginRight: 10 }}
          placeholder="Chat"
          value={chat}
          onChangeText={(t) => setChat(t)}
          onSubmitEditing={() => submit()}
          rightIcon={{
            type: "font-awesome",
            name: "arrow-circle-up",
            color: "#0A84FF",
            size: 25,
            onPress: () => submit(),
          }}
        />
      </KeyboardAvoidingView>
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
  },

  blueBubble: {
    backgroundColor: "#0078fe",
    padding: 10,
    marginLeft: "45%",
    borderRadius: 5,
    marginTop: 5,
    marginRight: "5%",
    maxWidth: "50%",
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
