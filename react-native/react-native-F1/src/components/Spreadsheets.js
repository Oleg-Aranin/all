import React from 'react'
import {TouchableOpacity} from 'react-native'
import {List, ListItem, Text, Left, Right, Icon} from 'native-base';

export default ({driver, onPressHandler}) => {
    return (
        <List>
            <ListItem>
                <Left>
                    <TouchableOpacity onPress={onPressHandler}>
                        <Text>{driver.familyName} {driver.givenName}</Text>
                    </TouchableOpacity>
                </Left>
                <Right>
                    <TouchableOpacity onPress={onPressHandler}>
                        <Icon name="arrow-forward"/>
                    </TouchableOpacity>
                </Right>
            </ListItem>
        </List>
    )
}
