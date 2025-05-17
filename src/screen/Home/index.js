import React, { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


const Home =()=>{
    const [text,setText] = useState('');
    const [list,setList] = useState([]);

    const handlePress=(prev)=>{
        if(text.trim()){
        let newtext = text.trim();
        const date = new Date().toISOString();
        setList([...list,{name:text.trim(),id:date}]);
        setText('');
        }
        console.log('list is ',list);
    }
    
    const handleDelete=(item)=>{
        console.log(item?.id)
      let newList =  list.filter((items) => items?.id != item?.id  );
      setList(newList)
      console.log('new list is',newList)
    }

    return(
        <ScrollView style={styles.main} >
                        <Text style={styles.title} >{'Home'}</Text>
                <View style={styles.header} >

            <TextInput value={text} onChangeText={(t) => setText(t) } placeholder={'Enter text'} />
                </View>
            <TouchableOpacity style={styles.button} onPress={handlePress} >
                <Text style={styles.buttonText} >{'Add'}</Text>
            </TouchableOpacity>

            <View>
                <FlatList data={list} renderItem={(item) => (
                    <View style={{flexDirection:'row',justifyContent:"space-between",padding:8,marginTop:10}} >
                        <Text>{item?.item?.name}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item?.item)} >

                        <Text>{'X'}</Text>
                        </TouchableOpacity>
                    </View>
                ) } />
            </View>
        </ScrollView>
    )
}

export default Home;

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#f4f4f4',
    },
    header:{
        padding:4,
        borderRadius:4,
        borderWidth:1
    },title:{
        fontSize:24,color:'black',fontWeight:'bold'
    },
    button:{
        padding:16,backgroundColor:'green',maxWidth:120,justifyContent:"center",alignItems:'center',marginTop:10
    },
    buttonText:{
        color:'white',
        fontSize:20,fontWeight:'600'
    }
})