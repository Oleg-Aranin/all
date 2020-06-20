import React from 'react'
import {View, Text, StyleSheet, Image,} from 'react-native'

export default ({price, text, img, subTitle = null, fontBold, fontRegular, discountText = null}) => {
    return (
        <View style={styles.blockContent}>
            <Image
                source={img}
                style={styles.contentImg}
            />
            <View style={styles.TextContentContainer}>
                <Text style={[styles.textContent, fontRegular]}>
                    {text}
                </Text>
            </View>

            <View>
                <Text style={[styles.priceStyle, fontBold]}>{price}</Text>
                <Text style={[styles.subPriceStyle, fontBold]}>{subTitle}</Text>
                <Text style={[styles.discountStyle, fontRegular]}>{discountText}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blockContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FEFEFE',
        padding: 10,
        marginTop: 5,
        marginBottom: 10
    },
    priceStyle: {
        fontSize: 18,
        lineHeight: 25,

    },
    TextContentContainer: {
        width: 176,
    },
    textContent: {
        lineHeight: 19,
        color: '#151515'
    },
    contentImg: {
        width: 36,
        height: 51
    },
    subPriceStyle: {
        lineHeight: 19,
        color: 'rgba(0, 0, 0, 0.6)'
    },
    discountStyle: {
        color: '#FF2929',
        lineHeight: 19,
    }
})
