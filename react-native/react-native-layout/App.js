import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import * as Font from 'expo-font'
import HeaderIcon from "./src/icons/HeaderIcon";
import HeaderIconLeft from "./src/icons/HeaderIconLeft";
import ButtonSvg from "./src/icons/ButtonSvg";
import SearchSvg from "./src/icons/SearchSvg";
import InputRight from "./src/icons/InputRight";
import Content from "./src/components/Content";

export default () => {
    const [fontLoaded, setFontLoaded] = useState(false)

    useEffect( () => {
        getFonts()
    }, [])

    const getFonts = async () => {
        await Font.loadAsync({
            'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
        });
        await Font.loadAsync({
            'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        });

        return setFontLoaded(true)
    }


    if (!fontLoaded) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <View style={styles.TextIconHeader}>
                    <Image
                        source={require('./assets/Group122.png')}
                        style={styles.blackSquare}
                    />
                    <Image
                        source={require('./assets/imageFace.png')}
                        style={styles.face}
                    />
                    <Text style={[styles.headerText, styles.openSansBold]}>Johnissimus Van-Doe</Text>
                    <HeaderIcon/>
                    <HeaderIconLeft/>
                </View>
            </View>


            <View style={styles.container}>
                <TouchableOpacity style={styles.button}>
                    <ButtonSvg/>
                    <Text style={[styles.textButton, styles.openSansBold]}>Club member</Text>
                </TouchableOpacity>

                <View style={styles.inputContainer}>
                    <SearchSvg/>
                    <TextInput style={styles.inputTextStyle}/>
                    <View style={styles.inputIconRight}>
                        <InputRight/>
                    </View>
                </View>

                <View style={styles.containerAfterInput}>
                    <Text style={[styles.textAfterInput, styles.openSansBold]}>7 items</Text>
                    <Text style={[styles.textAfterInput, styles.openSansBold]}>#0134234</Text>
                </View>

                <ScrollView>
                    <View style={styles.content}>
                        <Content
                            price='$349.38'
                            text="Kendall Jackson Vintner's Reserve Chardonnay"
                            img={require('./assets/image2.png')}
                            fontBold={styles.openSansBold}
                            fontRegular={styles.openSansRegular}
                        />
                        <Content
                            price='$4,439.98'
                            text="Kendall Jackson Vintner's Reserve Chardonnay Luxury Wine"
                            img={require('./assets/image33.png')}
                            subTitle='2 x $2.035.67'
                            fontBold={styles.openSansBold}
                            fontRegular={styles.openSansRegular}
                        />
                        <Content
                            price='$349.38'
                            text="Kendall Chardonnay"
                            img={require('./assets/Rectangle22.png')}
                            fontBold={styles.openSansBold}
                            fontRegular={styles.openSansRegular}
                        />
                        <Content
                            price='$5,349.38'
                            text="Kendall Jackson Vintner's Reserve Chardonnay"
                            img={require('./assets/image2.png')}
                            fontBold={styles.openSansBold}
                            fontRegular={styles.openSansRegular}
                        />
                        <Content
                            price='$439.98'
                            text="Jackson Luxury Wine"
                            img={require('./assets/image2.png')}
                            fontBold={styles.openSansBold}
                            fontRegular={styles.openSansRegular}
                            subTitle='2 x $345.67'
                            discountText='10% (-$25.99)'
                        />
                    </View>

                    <View style={styles.totalContianer}>
                        <View style={styles.totalStyle}>
                            <Text style={[styles.discountTextStyle, styles.openSansRegular]}>Discount: </Text>
                            <Text style={[styles.discountTextPercentStyle, styles.openSansBold]}>10%</Text>
                            <Text style={[styles.discountTextPercentStyle, styles.openSansRegular]}> (-$25.99)</Text>
                        </View>

                        <View style={styles.totalStyle}>
                            <Text style={[styles.discountTextStyle, styles.openSansRegular]}>Total:</Text>
                            <Text style={[styles.totalNamberStyle, styles.openSansBold]}>$1,300.00</Text>
                        </View>
                    </View>

                    <View style={styles.containerButtons}>
                        <View style={styles.twoButtons}>
                            <TouchableOpacity style={styles.buttonWhite}>
                                <Text style={[styles.orderStyle, styles.openSansBold]}>New order</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonWhite}>
                                <Text style={[styles.orderCancelStyle, styles.openSansRegular]}>Cancel order</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.buttonBlue}>
                                <Text style={[styles.checkoutButton, styles.openSansBold]}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    header: {
        flex: 2,
        height: 96,
        backgroundColor: '#FEFEFE',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    TextIconHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
        marginLeft: 25
    },
    headerText: {
        lineHeight: 19,
        color: '#151515',
        marginRight: 9
    },
    container: {
        flex: 9,
        marginHorizontal: 16
    },
    button: {
        flexDirection: 'row',
        height: 56,
        backgroundColor: '#28A745',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginTop: 16
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 18,
        marginLeft: 9
    },
    openSansBold: {
        fontFamily: 'open-sans-bold'
    },
    openSansRegular: {
        fontFamily: 'open-sans-regular'
    },
    face: {
        width: 32,
        height: 32,
        borderRadius: 32,
        marginRight: 10,
    },
    blackSquare: {
        width: 32,
        height: 30,
        marginRight: 34
    },
    inputContainer: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        backgroundColor: '#FEFEFE',
        marginTop: 16,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16
    },
    inputIconRight: {
        height: '100%',
        width: 75,
        backgroundColor: '#151515',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputTextStyle: {
        flex: 1,
        marginLeft: 10
    },
    textAfterInput: {
        fontSize: 12,
        color: '#151515',
        lineHeight: 16
    },
    containerAfterInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 26
    },
    content: {},
    price: {
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
    totalStyle: {
        flexDirection: 'row',
        marginBottom: 7,
        alignItems: 'flex-end'
    },
    totalContianer: {
        marginTop: 20,
        alignItems: 'flex-end',
        marginBottom: 22
    },
    discountTextStyle: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.6)',
        lineHeight: 18,
        marginRight: 10
    },
    discountTextPercentStyle: {
        fontSize: 13,
        lineHeight: 18,
        color: '#FF2929',
    },
    totalNamberStyle: {
        color: '#151515',
        fontSize: 19,
        lineHeight: 25
    },
    containerButtons: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    buttonWhite: {
        width: 130,
        height: 50,
        backgroundColor: '#FEFEFE',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonBlue: {
        backgroundColor: '#002A5C',
        borderRadius: 3,
        width: 205,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    twoButtons: {
        justifyContent: 'space-between'
    },
    orderStyle: {
        color: '#151515',
        lineHeight: 19
    },
    orderCancelStyle: {
        color: 'rgba(0, 0, 0, 0.6)',
        lineHeight: 19
    },
    checkoutButton: {
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 27
    }
})
