import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
	Image,
	View,
	Text,
	StyleSheet,
	Button,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import Web3Auth from '../components/Web3auth';

const ConsumerLoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<>
        <SafeAreaView style={{ flex: 1 }}>
			<Button title="Go back" onPress={() => navigation.goBack()} />
			<View style={styles.container}>
				<Text style={styles.title}>SIGN IN AS CONSUMER</Text>

				<TextInput
					style={styles.input}
					onChangeText={setEmail}
					value={email}
					placeholder="Email"
					keyboardType="email-address"
				/>
				<TextInput
					style={styles.input}
					onChangeText={setPassword}
					value={password}
					placeholder="Password"
					secureTextEntry
				/>
				<TouchableOpacity onPress={() => console.log('Forgot Password')}>
					<Text style={styles.forgotPassword}>Forgot Password</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.button}>
					<Button title="Sign In" onPress={() => console.log('Sign In')} />
				</TouchableOpacity>

				<Text style={{ marginTop: 20 }}>Or Sign In with</Text>
				<View style={styles.iconContainer}>
					<Image
						style={styles.icon}
						source={require('../assets/images/icons/Apple.png')}
					/>
					<Image
						style={styles.icon}
						source={require('../assets/images/icons/Google.png')}
					/>
				</View>
				<Text>Or</Text>
				<View style={styles.iconContainer}>
                    <Web3Auth onConnect={() => console.log('Web3 Connected')} />
					
					<Image
						style={styles.icon}
						source={require('../assets/images/icons/metamaskW.png')}
					/>
				</View>
			</View>
            </SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		padding: 5,
		borderRadius: 25,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: '80%',
	},

	buttonText: {
		color: '#5d11cf',
		fontSize: 16,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 45,
		height: 45,
	marginLeft: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 50,
	},
	input: {
		backgroundColor: '#fff',
		padding: 15,
		borderRadius: 25,
		borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		width: '80%',
	},
	forgotPassword: {
		color: 'blue',
		marginTop: 10,
		right: -90,
		marginBottom: 30,
	},
	iconContainer: {
		flexDirection: 'row',
		margin: 10,
	},
});

export default ConsumerLoginScreen;
