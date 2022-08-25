import React, {FC, useRef} from 'react';
import {Animated, Dimensions, TouchableOpacity, StyleSheet, Text, View} from 'react-native';

export default function Tabs(props: {
	tabs: string[],
	els: FC[],
	dividerColor?: string,
	tabsColor?: string,
	contentColor?: string,
	tabsTextColor?: string,
}) {
	const translateDividerAnim = useRef(new Animated.Value(0)).current
	const translateContentAnim = useRef(new Animated.Value(0)).current
	const changeContentHeightAnim = useRef(new Animated.Value(100)).current
	const tabWidth = Dimensions.get('window').width * .9;
	const [heights, setHeights] = React.useState<number[]>([])
	const black = '#000';
	const white = '#fff';

	const startDividerAnimate = (index: number) => {
		Animated.timing(translateDividerAnim, {
			toValue: tabWidth * index / props.tabs.length,
			useNativeDriver: false,
			duration: 200,
		}).start()

		Animated.timing(translateContentAnim, {
			toValue: -(tabWidth * index),
			useNativeDriver: false,
			duration: 200,
		}).start()

		Animated.timing(changeContentHeightAnim, {
			toValue: heights[index] + 10,
			useNativeDriver: false,
			duration: 200
		}).start()
	}

	const getHeights = (nativeEvent: any, index: number) => {
		const tempHeights: any = heights
		const {height} = nativeEvent.nativeEvent.layout;
		if (tempHeights.length === 0 && index === 0) {
			Animated.timing(changeContentHeightAnim, {
				toValue: height,
				useNativeDriver: false,
				duration: 200
			}).start()
		}
		if (!tempHeights[index]) {
			tempHeights[index] = height
		}
		setHeights(tempHeights)
	}

	return (
		<View style={styles.accountFormTabs}>
			{
				props.tabs.length === props.els.length ?
					(
						<View
							style={{
								backgroundColor: props.tabsColor || white,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
							}}
						>
							<View style={styles.headerTabsContainer}>
								{
									props.tabs.map((tab, index) => (
										<TouchableOpacity
											style={{
												backgroundColor: props.tabsColor || white,
												width: tabWidth / props.tabs.length,
												...styles.headerTabs
											}}
											activeOpacity={.8}
											key={index}
											onPress={() => startDividerAnimate(index)}
										>
											<Text
												style={{
													color: props.tabsTextColor || black
												}}>
												{tab}
											</Text>
										</TouchableOpacity>
									))
								}
							</View>
							<Animated.View
								style={{
									transform: [{translateX: translateDividerAnim}],
									width: (tabWidth / props.tabs.length),
									backgroundColor: props.dividerColor || black,
									...styles.headerTabsDivider
								}}
							/>
							<View
								style={{
									backgroundColor: props.contentColor || white,
									...styles.tabContentContainer
								}}
							>
								{
									props.els.map((el, index) => (
										<Animated.View
											style={{
												transform: [{translateX: translateContentAnim}],
												width: tabWidth,
												height: changeContentHeightAnim
											}}
											key={index}
										>
											<View onLayout={(nativeEvent: any) => getHeights(nativeEvent, index)}>
												{React.createElement(el)}
											</View>
										</Animated.View>
									))
								}
							</View>
						</View>
					) : (
						<View style={{alignItems: 'center'}}>
							<Text>Tabs length and els length are not equal</Text>
						</View>
					)
			}
		</View>
	)
}

const styles = StyleSheet.create({
	accountFormTabs: {
		width: '90%',
		borderRadius: 10,
		paddingBottom: 10,
		overflow: 'hidden',
	},
	headerTabsContainer: {
		flexDirection: 'row',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	headerTabs: {
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTabsDivider: {
		height: 3
	},
	tabContentContainer: {
		flexDirection: 'row',
		overflow: 'hidden',
		paddingBottom: 10,
		paddingTop: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
})