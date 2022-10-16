import React, { FC } from "react";
import { View, StyleSheet, I18nManager, Text } from 'react-native'
import { ternary } from "../utils/Tools";

type PrecentageChartProps = {
    color: string,
    shadowColor: string,
    bgColor: string,
    radius: number,
    borderWidth: number,
    percent: number,
}

function percentToDegrees(percent: number) {
    return percent * 3.6
}

let direction = ternary(I18nManager.isRTL, 'right', 'left');
let opDirection = ternary(I18nManager.isRTL, 'Left', 'Right');

const PrecentageChart: FC<PrecentageChartProps> = (props) => {

    function computeDerivedState() {
        const percent = Math.max(Math.min(100, props.percent), 0)
        const needHalfCircle2 = percent > 50
        let halfCircle1Degree
        let halfCircle2Degree
        // degrees indicate the 'end' of the half circle, i.e. they span (degree - 180, degree)
        if (needHalfCircle2) {
            halfCircle1Degree = 180
            halfCircle2Degree = percentToDegrees(percent)
        } else {
            halfCircle1Degree = percentToDegrees(percent)
            halfCircle2Degree = 0
        }

        return {
            halfCircle1Degree,
            halfCircle2Degree,
            halfCircle2Styles: {
                // when the second half circle is not needed, we need it to cover
                // the negative degrees of the first circle
                backgroundColor: needHalfCircle2
                    ? props.color
                    : props.shadowColor,
            },
        }
    }

    function renderHalfCircle(rotateDegrees: number, halfCircleStyles?: any) {
        const { radius, color } = props
        return (
            <View
                style={[
                    styles.leftWrap,
                    {
                        width: radius,
                        height: radius * 2,
                    },
                ]}
            >
                <View
                    style={[
                        styles.halfCircle,
                        {
                            width: radius,
                            height: radius * 2,
                            borderRadius: radius,
                            overflow: 'hidden',
                            transform: [
                                { translateX: radius / 2 },
                                { rotate: `${rotateDegrees}deg` },
                                { translateX: -radius / 2 },
                            ],
                            backgroundColor: color,
                            ...halfCircleStyles,
                        },
                    ]}
                />
            </View>
        )
    }

    function renderInnerCircle() {
        const radiusMinusBorder = props.radius - props.borderWidth
        return (
            <View
                style={[
                    styles.innerCircle,
                    {
                        width: radiusMinusBorder * 2,
                        height: radiusMinusBorder * 2,
                        borderRadius: radiusMinusBorder,
                        backgroundColor: props.bgColor,
                    },
                ]}
            >
                <Text style={styles.precentage}>{Math.max(Math.min(100, props.percent), 0).toFixed(0)}%</Text>
            </View>
        )
    }

    const {
        halfCircle1Degree,
        halfCircle2Degree,
        halfCircle2Styles,
    } = computeDerivedState()

    return (
        <View
            style={[
                styles.outerCircle,
                {
                    width: props.radius * 2,
                    height: props.radius * 2,
                    borderRadius: props.radius,
                    backgroundColor: props.shadowColor
                },
            ]}
        >
            {renderHalfCircle(halfCircle1Degree)}
            {renderHalfCircle(halfCircle2Degree, halfCircle2Styles)}
            {renderInnerCircle()}
        </View>
    )

}

export default PrecentageChart;

const styles = StyleSheet.create({
    outerCircle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftWrap: {
        position: 'absolute',
        top: 0,
        [`${direction}`]: 0,
    },
    halfCircle: {
        position: 'absolute',
        top: 0,
        left: 0,
        [`borderTop${opDirection}Radius`]: 0,
        [`borderBottom${opDirection}Radius`]: 0,
    },
    precentage: {
        color: 'white',
        fontSize: 12
    }
})