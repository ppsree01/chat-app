import React, {useState} from 'react';
import {View, Text} from 'react-native';

function Message({text}) {
    return (
        <View>
            <Text>{text}</Text>
        </View>
    );
}

export default Message;