import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'
import { render } from 'react-dom';
export default class MyHeader extends Component{
  constructor(props){
    super(props)
    this.state={
    value:""

}
  }

getNumberOfUnreadNotification(){
  db.collection("all_notifications").where("notification_status","==","unread").onSnapshot((snapshot)=>{
  var unreadNotifications=snapshot.docs.map((doc)=>{
  doc.data()
})
  this.setState({
    value:unreadNotifications.length
  })
  })
}
componentDidMount(){
  this.getNumberOfUnreadNotifications()
}

 BellIconWithBadge=(props)=>{
  return(
    <View>
      <Icon name='bell' type='font-awesome' color='#696969' size={25}
        onPress={() =>props.navigation.navigate('Notification')}/>
       <Badge
        value="1"
       containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
    </View>
  )
}


render(){
  return (
    <Header
      leftComponent={<Icon name='bars' type='font-awesome' color='#696969'   onPress={() => this.props.navigation.toggleDrawer()}/>}
      centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
      rightComponent={<BellIconWithBadge {...this.props}/>}
      backgroundColor = "#eaf8fe"
    />
  );
};
}

