import { ScrollView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Card, Button, Text, Icon } from "@rneui/themed";
const logo = require("../assets/logo.png");
const anotherLogo = require("../assets/react-native.png");
const andAnotherLogo = require("../assets/openai.jpg");

export default function Home({ navigation }: { navigation: any }) {
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
      <StatusBar style="auto" />
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
