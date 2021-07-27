/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import HomeScreen from './src/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import Search from 'react-native-vector-icons/Feather';

const width = Dimensions.get("window").width

export default class App extends Component {

    renderHeader(){
        return(
            <View style={StyleSheet.headerContainer} >
                <View style={styles.header} >
                    <View>
                        <Text style={styles.nameStyle} >Hello Steve,</Text>
                        <Text style={styles.morningText}>Good Morning</Text>
                    </View>

                    <View style={styles.imageContainer} >
                        <TouchableOpacity>
                        <Search name="search"  size={28} color="gray" />
                        </TouchableOpacity>
                        <Image
                            source={require('./assets/avatar.png')}
                            style={styles.avatar}
                        />
                    </View>
                </View>
            </View>
           
        )
    }

    render() {
        return (
            <NavigationContainer>
                {this.renderHeader()}
                <HomeScreen/>
            </NavigationContainer>
        )
    }
}


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white', 
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
    },
    avatar: {
        height: 40,
        width: 40,
        marginLeft: 20,
    },
    morningText: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    nameStyle: {
        fontSize: 16, 
        color: 'gray',
    },
})