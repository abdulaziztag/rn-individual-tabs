import React, { useRef } from 'react';
import { Animated, Dimensions, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
export default function Tabs(props) {
    const translateDividerAnim = useRef(new Animated.Value(0)).current;
    const translateContentAnim = useRef(new Animated.Value(0)).current;
    const changeContentHeightAnim = useRef(new Animated.Value(100)).current;
    const tabWidth = Dimensions.get('window').width * .9;
    const [heights, setHeights] = React.useState([]);
    const black = '#000';
    const white = '#fff';
    const startDividerAnimate = (index) => {
        Animated.timing(translateDividerAnim, {
            toValue: tabWidth * index / props.tabs.length,
            useNativeDriver: false,
            duration: 200,
        }).start();
        Animated.timing(translateContentAnim, {
            toValue: -(tabWidth * index),
            useNativeDriver: false,
            duration: 200,
        }).start();
        Animated.timing(changeContentHeightAnim, {
            toValue: heights[index] + 10,
            useNativeDriver: false,
            duration: 200
        }).start();
    };
    const getHeights = (nativeEvent, index) => {
        const tempHeights = heights;
        const { height } = nativeEvent.nativeEvent.layout;
        if (tempHeights.length === 0 && index === 0) {
            Animated.timing(changeContentHeightAnim, {
                toValue: height,
                useNativeDriver: false,
                duration: 200
            }).start();
        }
        if (!tempHeights[index]) {
            tempHeights[index] = height;
        }
        setHeights(tempHeights);
    };
    return (React.createElement(View, { style: styles.accountFormTabs }, props.tabs.length === props.els.length ?
        (React.createElement(View, { style: {
                backgroundColor: props.tabsColor || white,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
            } },
            React.createElement(View, { style: styles.headerTabsContainer }, props.tabs.map((tab, index) => (React.createElement(TouchableOpacity, { style: {
                    backgroundColor: props.tabsColor || white,
                    width: tabWidth / props.tabs.length,
                    ...styles.headerTabs
                }, activeOpacity: .8, key: index, onPress: () => startDividerAnimate(index) },
                React.createElement(Text, { style: {
                        color: props.tabsTextColor || black
                    } }, tab))))),
            React.createElement(Animated.View, { style: {
                    transform: [{ translateX: translateDividerAnim }],
                    width: (tabWidth / props.tabs.length),
                    backgroundColor: props.dividerColor || black,
                    ...styles.headerTabsDivider
                } }),
            React.createElement(View, { style: {
                    backgroundColor: props.contentColor || white,
                    ...styles.tabContentContainer
                } }, props.els.map((el, index) => (React.createElement(Animated.View, { style: {
                    transform: [{ translateX: translateContentAnim }],
                    width: tabWidth,
                    height: changeContentHeightAnim
                }, key: index },
                React.createElement(View, { onLayout: (nativeEvent) => getHeights(nativeEvent, index) }, React.createElement(el)))))))) : (React.createElement(View, { style: { alignItems: 'center' } },
        React.createElement(Text, null, "Tabs length and els length are not equal")))));
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
});
//# sourceMappingURL=index.js.map