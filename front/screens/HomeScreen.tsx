import * as React from 'react';
import { Image,  StyleSheet } from 'react-native';
import { Container, Title, Separator } from '../components/StyledComponents';

export default function HomeScreen(): JSX.Element {
	return (
		<Container>
<Image
    style={styles.logo}
    source={require('../assets/images/tp.jpg')}
/>
			<Title>Home</Title>
			<Separator />
		</Container>
	);
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 100,
        zIndex: 100,
     
    },
});