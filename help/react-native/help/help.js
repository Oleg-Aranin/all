import React from 'react'
import {Image, StyleSheet, View} from "react-native";

================================================================
    на андройде что бы работала нормально прокрутка
<View style={{flex: 1}} > или <> </>

===================================================================

<Image style={styles.image} source={ { uri: result.image_url } } />

const styles = StyleSheet.create({
        image: {
            width: 250,
            height: 120,
            borderRadius: 4
        }
    })

    ===============================================================

<FlatList
    horizontal //список по горизонтали
    showsHorizontalScrollIndicator={false} // не показывать полосу прокрутки
    keyExtractor={friend => friend.name} //задаем уникальный ключ
    data={friends} //передаем массив
    renderItem={({item}) => <Text style={styles.textStyle} >{item.name}</Text>} //рендерим смисок
/>

// ======================================
<Button
    title='Go to Components Demo' //текс на кнопке
    onPress={() => props.navigation.navigate('Components')} // обработчик нажатия на кнопку
/>

<TouchableOpacity onPress={() => props.navigation.navigate('Components')} >
<Text>Go to List Demo</Text>
</TouchableOpacity>

// =================================================
<TextInput
style={styles.input}
autoCapitalize='none' можно выбрать нескалько вариантов
autoCorrect={false}  по умолчанию тру
value={name}
onChangeText={newValue => setName(newValue)}
onEndEditing={() => }
/>

=============================== посишет ==============

https://loading.io/flexbox/
https://flexbox.help/

ставим родительскому компоненту
alignItems: 'stretch', 'flex-end', 'flex-start', 'center', 'baseline' (горизонтальная позиция)
flexDirection: 'row', 'column'
justifyContent: 'flex-start, 'center', 'flex-end', 'space-between', space-around' (вертикальная позиция)

дочернему
flex: 1, 2, 3, 4 ...
alignSelf: 'flex-start, 'center', 'flex-end'

на всю ширину и высоту
position: 'absolute'
right: 0,
bottom: 0,
top: 0,
left: 0
или короткая запись
...StyleSheet.absoluteFillObject

по центру
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    lineHeight: 40 расстояние между строчками

    ==================================================================
    <NavigationEvents
        onWillFocus={() => {}}
        onDidFocus={() => {}}
        onWillBlur={() => {}}
        onDidBlur={() => {}}
    />

    <SafeAreaView forceInset={{top: 'always'}}>
