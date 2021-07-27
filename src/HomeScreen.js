/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View , StyleSheet, Dimensions} from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Tasks from './Tasks'
import CompletedTask from './CompletedTask';
import { fontSize } from 'styled-system';

const Width = Dimensions.get("screen").width;

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
    return (
        <>
            <Tab.Navigator 
                initialRouteName="Tasks"
                tabBarOptions={{
                    labelStyle: { 
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 'bold',
                    },
                    style: {
                        shadowOffset: { height: 0, width: 0 }, 
                        shadowColor: 'transparent',
                        shadowOpacity: 0,
                        elevation: 0 
                    },
                    indicatorStyle: {
                        height: 3,
                    },
                }}
            >
                <Tab.Screen name="Tasks" options={{title: 'New tasks'}} component={Tasks} />
                <Tab.Screen name="CompletedTask" options={{title: 'Completed'}} component={CompletedTask}  />
            </Tab.Navigator>
        </>
    );
}

