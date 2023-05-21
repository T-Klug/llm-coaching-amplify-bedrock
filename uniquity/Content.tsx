import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Button, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';


export default function content() {
    const {signOut, user} = useAuthenticator();
    return <><Text>Hello {user.attributes.email}</Text><Button title='Sign Out' onPress={() => signOut()} /><StatusBar style="auto" /></>
}