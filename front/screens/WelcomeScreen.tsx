import React from 'react';
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import '../global.css';

export default function WelcomeScreen({ navigation }) {
	return (
		<>
			<View style={styles.container}>
				<Image
					style={styles.logo}
					source={require('../assets/images/tp.jpg')}
				/>
				<Text style={styles.title}>Welcome!! You are</Text>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('BrandLoginScreen')}
				>
					<Text style={styles.buttonText}>Brand</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('ConsumerLoginScreen')}
				>
					<Text style={styles.buttonText}>Consumer</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 25,
    borderWidth: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
    width:'80%',
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
	logo: {
		width: 200,
		height: 100,
		zIndex: 100,
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 20,
	},
});
