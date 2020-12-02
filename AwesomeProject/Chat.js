/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, {useState, useReducer, Component} from 'react';
import Message from './Message';
import _ from 'lodash';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,TextInput,
    StatusBar,
    Button,
  } from 'react-native';
  import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
const SERVER_URL = "api.ppsree.net";

const axios = require('axios');
const style = {
    message: {
        backgroundColor: 'yellow',
    }
};

const Chat : () => React$Node = () => {
    const [message, setMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({
        isLoading: false,
        isLoaded: false,
    });
    const [chatState, addToMessages] = useReducer(
        (chatState, {messages}) => {  
            
            let chatMessages = [...chatState.messages, ...messages];
            
            chatMessages = _.sortBy(chatMessages, ['time']);

            return {
                messages: chatMessages,
                chatCount: chatMessages.length,
            }
        },
        {
            chatCount: 0,
            messages: []
        }
    );
    const {chatCount, messages} = chatState;
    
    if (!loadingStatus.isLoading && !loadingStatus.isLoaded) {
        setLoadingStatus({
            ...loadingStatus,
            isLoading: true,
        });
        axios({
            method: 'get',
            url: `http://${SERVER_URL}/vava`,
            responseType: 'json'
        }).then(function(response){
            let msgs = response.data;
            console.log(response);
            console.log(message.length);
            addToMessages({messages: msgs})
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        }).catch(function(error){
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        })
    }

    let mssgs = [];
    for (let i=0; i<messages.length; i++) {
        mssgs.push(<Text key={i.toString()}><Message text={messages[i].msg}/></Text>);
    }

    return(
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {/* <Header /> */}
          {/* {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )} */}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionDescription}>
                Chat Count: {chatCount}
              </Text>
              {mssgs}
              <TextInput value={message} style={style.message} placeholder="Type a message" onChangeText={text => setMessage(text)}></TextInput>
              <Button title="Send" onPress={() => {
                    let date = new Date;
                    let time = date.getTime();
                    if (message != "") {
                        console.log(message);
                        axios({
                            method: 'post',
                            url:`http://${SERVER_URL}/add`,
                            data: {
                                userid: "vava",
                                message: {
                                    msg: message,
                                    time: time
                                }
                            }
                        }).then((response) => {
                            console.log(response);
                            addToMessages({messages: [{"msg":message,"time":time}]});
                            setMessage(""); 
                        })
                    }
                }}></Button>
            </View>
            
            
          </View>
        </ScrollView>
      </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });

export default Chat;