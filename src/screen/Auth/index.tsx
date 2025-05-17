import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log('console caled login');
  }, []);
  const navigation = useNavigation();
  const handleLogin = async () => {
    if (email == '' && password == '') {
      Alert.alert('Please fill Feilds and check');
      return;
    }
    setLoading(true);
 
    try {
      const url =
        'https://mentools-challengeapp-backend-staging-fhgjf8ang2avf7cp.uksouth-01.azurewebsites.net/api/v1/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        Alert.alert('error recived is', data.message);
      }
      console.log('recieved ', data);
      Alert.alert('Success');
      navigation.navigate('AudioPlayerScreen');
    } catch (err: any) {
      Alert.alert('error --->', err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      {loading ? <ActivityIndicator color={'red'} /> : null}
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Enter Email'}
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={'Enter Password'}
          style={styles.input}
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={[styles.input, {color: '#fff'}]}>{'Login'}</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  main: {
    padding: 6,
    rowGap: 6,
    marginTop: 120,
  },
  inputContainer: {
    borderRadius: 4,
    borderWidth: 2,
  },
  input: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500',
  },
  button: {
    backgroundColor: 'green',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
