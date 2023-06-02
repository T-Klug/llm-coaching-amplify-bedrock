import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Button, Text, Icon, Divider } from "@rneui/themed";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
const logo = require("../assets/logo.png");
const anotherLogo = require("../assets/react-native.png");
const andAnotherLogo = require("../assets/openai.jpg");

export default function Home({ navigation }: { navigation: any }) {
  const { user, signOut } = useAuthenticator();
  return (
    <ScrollView>
      <Card>
        <Card.Title>What's on your Mind?</Card.Title>
        <Card.Divider />
        <Card.Image style={styles.cardImage} source={logo} />
        <Text style={styles.text}>
          This is where an activity might be and a card representing it
        </Text>
        <Button
          icon={
            <Icon name="launch" color="#ffffff" iconStyle={styles.iconStyle} />
          }
          buttonStyle={styles.buttonStyle}
          title="VIEW NOW"
          onPress={() => navigation.navigate("Details")}
        />
      </Card>
      <Card>
        <Card.Title>Another Card</Card.Title>
        <Card.Divider />
        <Card.Image style={styles.cardImage} source={anotherLogo} />
        <Text style={styles.text}>
          This is where an activity might be and a card representing it
        </Text>
        <Button
          icon={
            <Icon name="launch" color="#ffffff" iconStyle={styles.iconStyle} />
          }
          buttonStyle={styles.buttonStyle}
          title="VIEW NOW"
          onPress={() => navigation.navigate("Details")}
        />
      </Card>
      <Card>
        <Card.Title>And Another Card</Card.Title>
        <Card.Divider />
        <Card.Image style={styles.cardImage} source={andAnotherLogo} />
        <Text style={styles.text}>
          This is where an activity might be and a card representing it
        </Text>
        <Button
          icon={
            <Icon name="launch" color="#ffffff" iconStyle={styles.iconStyle} />
          }
          buttonStyle={styles.buttonStyle}
          title="VIEW NOW"
          onPress={() => navigation.navigate("Details")}
        />
      </Card>
      <Divider width={50} />
      <View style={{ margin: 10, flex: 1, alignItems: "center" }}>
        <Text>{user?.attributes?.email}</Text>
        <Button onPress={() => signOut()}>Logout</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    padding: 0,
    objectFit: "contain",
  },
  text: {
    marginBottom: 10,
    marginTop: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
  buttonStyle: {
    borderRadius: 5,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});
