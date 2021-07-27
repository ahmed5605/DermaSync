
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import { FAB } from 'react-native-paper';
import RBSheet from "react-native-raw-bottom-sheet";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import Swipeout from 'react-native-swipeout';
import Cross from 'react-native-vector-icons/Entypo';
import Refresh from 'react-native-vector-icons/Foundation';
import Edit from 'react-native-vector-icons/MaterialCommunityIcons';

const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;

var todaysDate = ''
export default class Tasks extends Component {
    
    constructor(props){
        super(props);
        this.state={
            data: [],
            close: false,
            taskTitle: '',
            todaysDate: '',
            categoryName: '',
            peopleName: '',
            description: '',
            startTime: '10 : 00',
            endTime: '11 : 00',
            dateValue: 'Select Date',
            timeValue: 'Select Time',
            timePickerVisibility: false,
            datePickerVisibility: false,
            startTimeVisibility: false,
            endTimeVisibility: false,
        }
    }

    componentDidMount(){
        this.fetch_data()

        var todaysDate = new Date()

        this.setState({todaysDate: todaysDate.getDate()})
    }

    fetch_data(){
      fetch('http://dermasync.herokuapp.com/api/tasks')
      .then((response) => response.json())
      .then((json) => {
       //console.log(json.data.tasks);
       this.setState({data: json.data.tasks})
      })
      .catch((error) => {
        console.error(error);
      });
    }

    changeCategory(name){
        this.setState({categoryName: name})
      
    }

    hideDate(){
        this.setState({datePickerVisibility: false})
    }

    handleDateConfirm = (date) => {
       
        var dateVAL = date.getDate()
        
        var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[date.getMonth()]

        var result = dateVAL + ' ' + monthName;
        this.setState({dateValue: result})
        this.setState({datePickerVisibility: false})
    }

    hideStartTime(){
        this.setState({startTimeVisibility: false})
    }

    handleStartTimeConfirm = (time) => {
        var hours = time.getHours()
        var minutes = time.getMinutes()

        var result = hours + ' : ' + minutes;
        this.setState({startTime: result})
        this.setState({startTimeVisibility: false})
    }

    hideEndTime(){
        this.setState({endTimeVisibility: false})
    }

    handleEndTimeConfirm = (time) => {
        var hours = time.getHours()
        var minutes = time.getMinutes()

        var result = hours + ' : ' + minutes;
        this.setState({endTime: result})
        this.setState({endTimeVisibility: false})
    }

    renderData(){
        return(
            <View>
                {this.state.data.map((item) => (
                    <Swipeout right={swipeoutBtns} close={this.state.close} style={styles.swipeOutContainer} >
                        <View style={styles.cardStyle} >
                            
                            <View style={styles.leftCardStyle} />
                        
                            <View style={styles.rightCardStyle} >
                                
                                <View style={{ margin: 20, }} >
                                    <View>
                                        <Text style={styles.shakuraStyle} >SHAKURA</Text>
                                        <Text style={styles.title} >{item.title}</Text>
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
                    </Swipeout>
                ))}
            </View>
        )
    }

    createTask(){
        console.log('create task');
        if(this.state.taskTitle){
            if(this.state.dateValue !== 'Select Date'){
                if(this.state.startTime !== '10 : 00'){
                    if(this.state.endTime !== '11 : 00'){
                        if(this.state.peopleName){
                            if(this.state.description){
                                console.log("success");
                                fetch("http://dermasync.herokuapp.com/api/tasks", {method: "POST",
                                body: JSON.stringify( {
                                    title: this.state.taskTitle,
                                    description: this.state.description,
                                })
                                })
                                .then((response) => response.text())
                                .then((responseData) => {
                                    console.log(responseData);
                                    this.RBSheet.close()
                                })
                                .catch((err) => {
                                    alert('Error : ' + err)
                                    this.RBSheet.close()
                                })
                            }else{
                                alert('Enter the Description!');
                            }
                        }else{
                            alert('Add People Name!');
                        }
                    }else{
                        alert('Enter the End Time!');
                    }
                }else{
                    alert('Enter the Start Time!');
                }
            }else{
                alert('Select a Date!');
            }
        }else{
            alert('Enter the Task tile!');
        }
    }

    renderBottomSheet(){
        return(
            <View style={styles.bsContainer} >
                 <View style={styles.bsContainer} >
                    <Text style={styles.bsHeading} >Create a task</Text>
                </View>

                <View style={styles.textInputContainer} >
                    <Text style={styles.titleStyle} >Task title</Text>
                    <TextInput
                        placeholder="Client Meet"
                        placeholderTextColor="gray"
                        value={this.state.taskTitle}
                        onChangeText={(value) => this.setState({taskTitle: value})}
                        style={styles.textInputStyle}
                    />
                </View>


                <View style={styles.textInputContainer} >
                    <Text style={styles.titleStyle} >Select Date</Text>
                   
                    <TouchableOpacity onPress={() => this.setState({datePickerVisibility: true})} style={styles.dateStyle}>
                        <Text style={styles.textStyle} >{this.state.dateValue}</Text>
                    </TouchableOpacity>
                    
                    <DateTimePickerModal
                        mode="date"
                        onCancel={this.hideDate}
                        onConfirm={this.handleDateConfirm}
                        isVisible={this.state.datePickerVisibility}
                    />
                </View>


                <View style={styles.textInputContainer} >
                    <Text style={styles.titleStyle} >Category</Text>
                    <View style={styles.categoryContainer} >
                        {category.map((item) => (
                            <TouchableOpacity onPress={() => this.changeCategory(item.name)} style={styles.categoryCard} >
                                <Text  style={styles.textStyle} >{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: width-40, marginTop: 10,}} >
                    <View>
                        <Text style={styles.timeContainer}>Start Time</Text>
                        <TouchableOpacity onPress={() => this.setState({startTimeVisibility: true})} style={styles.timeText}>
                            <Text style={styles.textStyle} >{this.state.startTime}</Text>
                            <DateTimePickerModal
                                isVisible={this.state.startTimeVisibility}
                                mode="time"
                                onConfirm={this.handleStartTimeConfirm}
                                onCancel={this.hideStartTime}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.timeContainer}>End Time</Text>
                        <TouchableOpacity onPress={() => this.setState({endTimeVisibility: true})} style={styles.timeText}>
                            <Text style={styles.textStyle} >{this.state.endTime}</Text>
                            <DateTimePickerModal
                                isVisible={this.state.endTimeVisibility}
                                mode="time"
                                onConfirm={this.handleEndTimeConfirm}
                                onCancel={this.hideEndTime}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.textInputContainer} >
                    <Text style={styles.titleStyle} >Add People</Text>
                    <TextInput
                        placeholder="Client Meet"
                        placeholderTextColor="gray"
                        value={this.state.peopleName}
                        onChangeText={(value) => this.setState({peopleName: value})}
                        style={styles.textInputStyle}
                    />
                </View>

                <View style={styles.textInputContainer} >
                    <Text style={styles.titleStyle} >Add description</Text>
                    <TextInput
                        placeholder="Description"
                        placeholderTextColor="gray"
                        value={this.state.description}
                        onChangeText={(value) => this.setState({description: value})}
                        style={styles.textInputStyle}
                    />
                </View>

                <TouchableOpacity onPress={() => this.createTask()} style={styles.buttonContainer} >
                    <Text style={styles.buttonText} >Create task</Text>
                </TouchableOpacity>
            </View>
        )
    }


    renderDateArray(){
        return(
            <>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                ref={ref => {this.scrollView = ref}} 
                onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
            >
                {dateArray.map((item) => (
                    <View style={{backgroundColor: item.date === this.state.todaysDate ? '#6d9bfc' : '#dcdcdc', margin: 4, width: 70, height: 100, justifyContent: 'center',alignItems: 'center', borderRadius: 10, borderWidth: 2, }} >
                       <Text style={{fontSize: 20}} >{item.date}</Text>
                        <Text style={{fontSize: 20}} >{item.day}</Text>
                    </View>
                ))}
            </ScrollView>
            </>
        )
    }

    render() {
        return (
            <View style={styles.container} >

                <View style={styles.cardContainer}>
                    {this.renderDateArray()}
                    {this.renderData()}
                </View>

                
                
                <FAB
                    style={styles.fab}
                    large
                    color="white"
                    icon="plus"
                    onPress={() => this.RBSheet.open()}
                />

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={height-120}
                    openDuration={250}
                    closeOnDragDown={true}
                    closeOnSwipeDown={false}
                    closeOnPressMask={false}
                    keyboardAvoidingViewEnabled={true}
                    customStyles={{
                        draggableIcon: {
                        backgroundColor: "#D9D9D9",
                        width: 140,
                        height: 5,
                        },
                        container: {
                            backgroundColor: 'white',
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20
                        }
                    }}
                    >
                    <ScrollView>
                        <TouchableOpacity activeOpacity={1} >
                            {this.renderBottomSheet()}
                        </TouchableOpacity>
                    </ScrollView>
                    </RBSheet>
                  
            </View>
        )
    }
}

const category = [
    {
        id: 1,
        name: 'Shakura',
        selected: true,
        activeColor: 'red',
        inactiveColor: 'white'
    },
    {
        id: 2,
        name: 'Shakura',
        selected: false,
        activeColor: 'red',
        inactiveColor: 'white'
    },
    {
        id: 3,
        name: 'Shakura',
        selected: false,
        activeColor: 'red',
        inactiveColor: 'white'
    },
    {
        id: 4,
        name: 'Shakura',
        selected: false,
        activeColor: 'red',
        inactiveColor: 'white'
    },
    {
        id: 5,
        name: 'Shakura',
        selected: false,
        activeColor: 'red',
        inactiveColor: 'white'
    },
    {
        id: 6,
        name: 'Shakura',
        selected: false,
        activeColor: 'red',
        inactiveColor: 'white'
    },
];

const swipeoutBtns = [
    {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        component: 
        <>
        <View style={{backgroundColor: 'white', height: 60, alignItems: 'center'}} >
            <TouchableOpacity 
            onPress={() => {}}
            style={{ marginTop: 15}} >
                <Cross name="circle-with-cross"  size={28} color="#fb6f6f" />
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', height: 60, alignItems: 'center'}} >
            <TouchableOpacity 
            onPress={() => {}}
            style={{ marginTop: 15}} >
                <Refresh name="refresh"  size={28} color="#fb6f6f" />
            </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white', height: 60, alignItems: 'center'}} >
            <TouchableOpacity 
            onPress={() => {}}
            style={{ marginTop: 15}} >
                <Edit name="pencil-circle-outline"  size={28} color="#fb6f6f" />
            </TouchableOpacity>
        </View>
        </>
        
   },
];

const dateArray = [
    {
        date: 1,
        day: 'Thu',
    },
    {
        date: 2,
        day: 'Fri',
    },
    {
        date: 3,
        day: 'Sat',
    },
    {
        date: 4,
        day: 'Sun',
    },
    {
        date: 5,
        day: 'Mon',
    },
    {
        date: 6,
        day: 'Tues',
    },
    {
        date: 7,
        day: 'Wed',
    },
    {
        date: 8,
        day: 'Thu',
    },
    {
        date: 9,
        day: 'Fri',
    },
    {
        date: 10,
        day: 'Sat',
    },
    {
        date: 11,
        day: 'Sun',
    },
    {
        date: 12,
        day: 'Mon',
    },
    {
        date: 13,
        day: 'Tues',
    },
    {
        date: 14,
        day: 'Wed',
    },
    {
        date: 15,
        day: 'Thu',
    },
    {
        date: 16,
        day: 'Fri',
    },
    {
        date: 17,
        day: 'Sat',
    },
    {
        date: 18,
        day: 'Sun',
    },
    {
        date: 19,
        day: 'Mon',
    },
    {
        date: 20,
        day: 'Tues',
    },
    {
        date: 21,
        day: 'Wed',
    },
    {
        date: 22,
        day: 'Thu',
    },
    {
        date: 23,
        day: 'Fri',
    },
    {
        date: 24,
        day: 'Sat',
    },
    {
        date: 25,
        day: 'Sun',
    },
    {
        date: 26,
        day: 'Mon',
    },
    {
        date: 27,
        day: 'Tues',
    },
    {
        date: 28,
        day: 'Wed',
    },
    {
        date: 29,
        day: 'Tues',
    },
    {
        date: 30,
        day: 'Wed',
    },
    
]

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: 'white',
        flex: 1,
    },
    cardContainer: {
        margin: 20,
    },
    swipeOutContainer: {
        height: 180,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
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
        backgroundColor: '#fb6f6f',
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
        color: '#fb6f6f',
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
    bsContainer: {
        alignItems: 'center',
    },
    bsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleStyle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 8,
        marginTop: 4,
    },
    dateStyle: {
        marginTop: 4,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    textStyle: {
        fontSize: 16,
        marginLeft: 10,
        color: 'gray',
    },
    textInputContainer: {
        width: width-40,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryCard: {
        height: 50,
        width: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        margin: 4,
    },
    timeContainer: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    timeText: {
        marginTop: 4,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        width: 130,
        height: 50,
    },
    buttonContainer: {
        width: width-60,
        margin: 20,
        height: 50,
        backgroundColor: '#6d9bfc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6d9bfc'
    },
})

