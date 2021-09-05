import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,CustomButtom,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component{
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      bookName:"",
      reasonToRequest:"",
      isBookRequestActive:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }
handleBookRequest=async()=>{
var {userId}=this.state
 var randomRequestId=this.getUniqueId()
 if(bookName && reasonToRequest){
   db.collection("requested_books").add({
     user_id:userId,
     book_name:bookName,
     reason_to_request:reasonToRequest,
     request_id:randomRequestId,
     book_status:"requested",
     date:firebase.firestore.FieldValue.serverTimestamp()
   })
   await this.getRequestedBooks(
     db.collection("users").where("email_id","==",userId)
     .get().then().then((snapshot)=>{
       snapshot.forEach((doc)=>{
        db.collection("user").doc(doc.id)
        .update({is_book_request_active:true})
       })
     })
   )
 
this.setState({
  bookName:"",
  reasonToRequest:"",
  requestId:randomRequestId

})
alert("book requested succesfully")}
else{
  alert("fill the details properly")
}
}

getRequestedBooks=()=>{
  const{userId}=this.state
  db.collection("requested_books").where("user_id","==",userId)
  .get().then((snapshot)=>{
snapshot.docs.map((doc)=>{
  const details=doc.data()
  if(details.book_status!=="received"){
    this.setState({
      requestId:details.request_id,
      requestedBookName:details.book_name,
      bookStatus:details.book_status,
      docId:doc.id
    })
  }
})
  })
}
getActiveBookRequest=()=>{
  const {userId}=this.state
  db.collection("users").where("email_id","==",userId)
  .onSnapshot((snapshot)=>{
snapshot.docs.map((doc)=>{
const details=doc.data()
this.setState({isBookRequestActive:details.is_book_request_active,userDocId:doc.id})

})
  })
}
  addRequest =(bookName,reasonToRequest)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('requested_books').add({
        "user_id": userId,
        "book_name":bookName,
        "reason_to_request":reasonToRequest,
        "request_id"  : randomRequestId,
    })

    this.setState({
        bookName :'',
        reasonToRequest : ''
    })

    return Alert.alert("Book Requested Successfully")
  }


  render(){
    var {bookName,reasonToRequest,isBookRequestActive,requestedBookName,bookStatus=this.state}
    return(
        <View style={styles.container}>
          <MyHeader title="Request Book" navigation ={this.props.navigation}/>
          {isBookRequestActive?(
          <View style={styles.requestedBookContainer}>
            <View style={style.requestBooksSubContainer}>
              <Text>Book name</Text>
              <Text>{requestedBookName}</Text>
            </View>
            <View style={styles.requestedBookSubContainer}>
              <Text>Book status</Text>
              <Text>{bookStatus}</Text>
            </View>
            <CustomButtom title={"received book"}
            onPress={()=>{
              const {requestBookName}=this.state
              this.sendNotification()
              this.updateBookRequestStatus()
              this.receivedBooks(requestedBookName)
            }}
            style={styles.button}
            titleStyle={style.buttonTile}/>
          </View>
          ):(
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"enter book name"}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}
                value={this.state.bookName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"Why do you need the book"}
                onChangeText ={(text)=>{
                    this.setState({
                        reasonToRequest:text
                    })
                }}
                value ={this.state.reasonToRequest}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Request</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>)}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  keyBoardStyle : {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10,
  },
  button:{
    width:"75%",
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop:20
    },
  }
)
