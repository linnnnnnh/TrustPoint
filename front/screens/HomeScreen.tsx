import * as React from 'react';
import { Image,  StyleSheet } from 'react-native';
import { Container, Title, Separator } from '../components/StyledComponents';

export default function HomeScreen(): JSX.Element {
	return (
		<Container>
            <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
			<Title>Home</Title>
			<Separator />
		</Container>
	);
}

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
});