import React ,{Component} from 'react'
import {View, Text,TouchableOpacity,ScrollView,FlatList,StyleSheet, Dimensions} from 'react-native';
import {ListItem,Icon} from "react-native-elements"
import SwipeListView from "react-native-swipe-list-view"
import db from "../config"

export default class SwipeableFlatList extends Component{
    constructor(props){
        super(props)
         this.state={
             allNotifications:this.props.allNotifications
         }
    }
    updateMarkAsRead=(notification)=>{
    db.collection("all_notifications")
    .doc(notification.doc_id)
    .update({
        notification_status:"read"

    })
    }
    renderItem=(data)=>{
    <ListItem leftElement={<Icon name="Book" type="font-awsome" color="blue"></Icon>}
    title={data.item.bookName}
    titleStyle={{color:"black",fontWeight:"bold"}}
    subtitle={data.item.message}
    bottomDivider
    />
    }
    renderHiddenItem=()=>{
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn,styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}></Text>
            </View>
        </View>
    }
    onSwipeValueChange=(swipeData)=>{
        var allNotifications=this.state.allNotifications
        const{key,value}=swipeData
        if (value<-Dimensions.get("window").width){
            const newData=[...allNotifications]
            this.updateMarkAsRead(allNotifications[key])
            newData.splice(key,1)
            this.setState({allNotifications:newData})
        }

    }

    render(){
        return(
            <View style={styles.container}>
                <SwipeListView disableRightSwipe
                data={this.state.allNotifications}
                renderItem={this.renderItem}
                renderHiddenItem={this.renderHiddenItem}
                rightOpenValue={-Dimensions.get("window").width}
                previewRowKey={"0"}
                previevOpenValue={-40}
                previevOpenDelay={3000}
                onSwipeValueChange={this.onSwipeValueChange}/>
            </View>
        )
    }

}