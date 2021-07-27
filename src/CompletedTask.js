/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions,} from 'react-native'
import Check from 'react-native-vector-icons/AntDesign'
const width = Dimensions.get("window").width

   export default class CompletedTask extends Component {

    constructor(props){
        super(props);
        this.state={
            data: [],
        }
    }

    componentDidMount(){
        //console.log("sdasd");
        this.fetch_data()
    }

    fetch_data(){
        fetch('http://dermasync.herokuapp.com/api/tasks?completed')
        .then((response) => response.json())
        .then((json) => {
        //console.log(json.data.tasks);
        this.setState({data: json.data.tasks})
        })
        .catch((error) => {
            console.error(error);
        });
    }

    renderData(){
        return(
            <View style={styles.container} >
                {this.state.data.map((item) => (
                    
                    <View style={{ backgroundColor: 'white', height: 180, marginBottom: 20, borderRadius: 20, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between'}} >
                        
                        <View style={styles.leftCardStyle} />
                    
                        <View style={styles.rightCardStyle} >
                   
                            <View style={styles.cardContainer} >
                                <View>
                                   <View style={styles.rowStyleWithSpace} >
                                        <View>
                                            <Text style={styles.shakuraStyle} >SHAKURA</Text>
                                            <Text style={styles.title} >{item.title}</Text>
                                        </View>
                                        <View  >
                                            <Check name="checkcircle"  size={28} color="#3dce64" />
                                        </View>
                                   </View>
                                    
                                    
                                    <Text style={styles.description} >{item.description}</Text>
                                </View>

                                <View style={styles.separator} />

                                <View style={styles.timeSlotContainer} >
                                    <View style={styles.rowStyle}>
                                        <Image
                                            source={require('../assets/clock.png')}
                                            style={styles.clockStyle}
                                        />
                                        <Text style={styles.timeSlotText} >10.30 am - 12.30 pm</Text>
                                    </View>
                                    
                                    <View style={styles.avatar1}>
                                        <View style={styles.avatar2}>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
              
                ))}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.containerStyle} >
                {this.renderData()}
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        width: width-20,
        marginTop: 20,
    },
    cardContainer: {
        margin: 20,
    },
    containerStyle: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    rowStyleWithSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    swipeOutContainer: {
        height: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
    },
    cardStyle: {
        backgroundColor: 'white',
        height: 180,
        marginBottom: 20,
        borderRadius: 20,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCardStyle: {
        backgroundColor: '#3dce64',
        width: 20,
        height: 178,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    rightCardStyle: {
        backgroundColor: 'white',
        flex: 1,
        height: 178,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20, 
    },
    shakuraStyle: {
        fontSize: 16,
        color: '#3dce64',
    },
    title: {
        fontSize: 22,
        color: 'black',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: 'gray',
    },
    separator: {
         height: 1,
         backgroundColor: 'gray',
         marginTop: 28,
    },
    timeSlotContainer: {
        flexDirection: 'row',
        height: 40,
        marginTop: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    clockStyle: {
        height: 20,
        width: 20,
    },
    timeSlotText: {
        fontSize: 16,
        color: 'gray',
        marginLeft: 10,
    },
    avatar1: {
        height: 30,
        width: 30,
        backgroundColor: '#fb6f6f',
        borderRadius: 15,
    },
    avatar2: {
         position: 'absolute',
         left: -20,
         height: 30,
         width: 30,
         backgroundColor: '#3dce64',
         borderRadius: 15,
    },
})

