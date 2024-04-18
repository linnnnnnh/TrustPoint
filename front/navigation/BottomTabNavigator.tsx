/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
/* disable-eslint */

import { Ionicons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from 'styled-components';

import TabHomeScreen from '../screens/HomeScreen';
import TabSettingsScreen from '../screens/SettingsScreen';
import TabRewardsScreen from '../screens/RewardsScreen';
import TabScanScreen from '../screens/ScanScreen';

import {
	BottomTabParamList,
	TabHomeParamList,
	TabSettingsParamList,
	TabRewardsParamList,
	TabScanParamList,
} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator(): JSX.Element {
	const theme = useTheme();

	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{ tabBarActiveTintColor: theme.colors.tint }}
		>
			<BottomTab.Screen
				name="Home"
				component={TabHomeNavigator}
				options={{
					tabBarIcon: ({ color }: { color: string }) => (
						<TabBarIcon name="home-outline" color={color} library="Ionicons" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Rewards"
				component={TabRewardsNavigator}
				options={{
					tabBarIcon: ({ color }: { color: string }) => (
						<TabBarIcon name="gift-outline" color={color} library="Ionicons" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Scan"
				component={TabScanNavigator}
				options={{
					tabBarIcon: ({ color }: { color: string }) => (
						<TabBarIcon name="scan-outline" color={color} library="Ionicons" />
					),
				}}
			/>
			<BottomTab.Screen
				name="Settings"
				component={TabSettingsNavigator}
				options={{
					tabBarIcon: ({ color }: { color: string }) => (
						<TabBarIcon name="user" color={color} library="Feather" />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
	name: string;
    color: string;
    library: 'Ionicons' | 'Feather';
}) {
    if (props.library === 'Ionicons') {
        return (
            <Ionicons
                name={props.name as any}
                size={30}
                style={{ marginBottom: -3 }}
                color={props.color}
            />
        );
    } else if (props.library === 'Feather') {
        return (
            <Feather
                name={props.name as any}
                size={30}
                style={{ marginBottom: -3 }}
                color={props.color}
            />
        );
    }
}

const TabHomeStack = createStackNavigator<TabHomeParamList>();

function TabHomeNavigator() {
	return (
		<TabHomeStack.Navigator screenOptions={{ headerShown: false }}>
			<TabHomeStack.Screen
				name="HomeScreen"
				component={TabHomeScreen}
				options={{ headerTitle: 'Home' }}
			/>
		</TabHomeStack.Navigator>
	);
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabRewardsParamList>();

function TabRewardsNavigator() {
	return (
		<TabOneStack.Navigator screenOptions={{ headerShown: false }}>
			<TabOneStack.Screen
				name="RewardsScreen"
				component={TabRewardsScreen}
				options={{ headerTitle: 'Wallet' }}
			/>
		</TabOneStack.Navigator>
	);
}

const TabSettingsStack = createStackNavigator<TabSettingsParamList>();

function TabSettingsNavigator() {
	return (
		<TabSettingsStack.Navigator screenOptions={{ headerShown: false }}>
			<TabSettingsStack.Screen
				name="SettingsScreen"
				component={TabSettingsScreen}
				options={{ headerTitle: 'Settings' }}
			/>
		</TabSettingsStack.Navigator>
	);
}

const TabScanStack = createStackNavigator<TabScanParamList>();

function TabScanNavigator() {
	return (
		<TabScanStack.Navigator screenOptions={{ headerShown: false }}>
			<TabScanStack.Screen
				name="ScanScreen"
				component={TabScanScreen}
				options={{ headerTitle: 'Scan' }}
			/>
		</TabScanStack.Navigator>
	);
}
