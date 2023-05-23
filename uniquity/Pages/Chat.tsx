import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Card, Icon, Text } from "@rneui/themed";

export default function Chat() {
  const { signOut, user } = useAuthenticator();
  return (
    <ScrollView>
      <Card>
        <Card.Title>HELLO WORLD</Card.Title>
        <Card.Divider />
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
          }}
        />
        <Text style={styles.text}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={
            <Icon name="code" color="#ffffff" iconStyle={styles.iconStyle} />
          }
          buttonStyle={styles.buttonStyle}
          title="VIEW NOW"
        />
      </Card>
      <Text>Welcom to Chat Page: {user.attributes?.email}</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    padding: 0,
  },
  text: {
    marginBottom: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  buttonStyle: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});
