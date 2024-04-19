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
					onPress={() => navigation.navigate('BrandAuth')}
				>
					<Text style={styles.buttonText}>Brand</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.buttonConsumer}
					onPress={() => navigation.navigate('ConsumerAuth')}
				>
					<Text style={styles.buttonText}>Consumer</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#006adc',
		padding: 10,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
    width:'80%',
	},
  buttonConsumer: {
    backgroundColor: '#cd5780',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width:'80%',
  },
	buttonText: {
		color: 'white',
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
