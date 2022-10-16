import React, { FC } from "react";
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

type DialogProps = {
    title: string;
    description: string;
}

const { width, height } = Dimensions.get('window');

const Dialog: FC<DialogProps> = ({ title, description }) => {
    return (
        <View style={styles.containerBackground}>
            <View style={styles.constainer}>
                <View style={styles.iconContainer}>
                    <Icon name="warning" color={'red'} size={26} />
                </View>
                <Text style={styles.headerTitle}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    )
}

export default Dialog;

const styles = StyleSheet.create({
    constainer: {
        width: width - 50,
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerBackground: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(4, 36, 68, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#d9d7d7',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
        margin: 10
    },
    description: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
        marginHorizontal: 40
    }
})