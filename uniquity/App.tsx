
import { StyleSheet, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react-native';
import Content from './Content';

Amplify.configure(awsExports);

export default function App() {
  
  return (
    <View style={styles.container}>
      <Authenticator.Provider children>
        <Authenticator>
          <Content/>
        </Authenticator>
      </Authenticator.Provider>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
