import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user)
  return (
    <View style={styles.container}>
      <Text>Hello {user.attributes.email}</Text>
      <Button title='Sign Out' onPress={() => signOut()}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default withAuthenticator(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
