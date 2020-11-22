
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { useForm } from 'react-hook-form';

// You can import from local files
import Input from '../../form/input';
import Form from '../../form';
import validation from '../../form/validation';
import images from '../../../assets/image';
import { useEffect } from 'react';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  password: string;
};
const { SlideInMenu } = renderers;
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



function Logo(){
    return (
        <View style={styles.logo}>
          <TouchableOpacity style={styles.button} onPress={()=>{alert("you clicked me")}}>
            <Image style={{resizeMode:"contain", height:35/2, width:233/2}} source={images.logo}/>
          </TouchableOpacity>
        </View>
      );
}

function PageTitle(){
    return (
        <View style={styles.pageTitle}>
          <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Image style={{resizeMode:"contain", height:57/2, width:124/2}} source={images.signin}/>
          </TouchableOpacity>
        </View>
      );
}

function GoBack({ navigation }:any){
    return (
        <View style={styles.back}>
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.pop()}}>
            <Image style={{resizeMode:"contain", height:25, width:27}} source={images.back}/>
          </TouchableOpacity>
        </View>
      );
}

function SubmitBtn({submit}:any){
    return (
        <View style={{position:"relative", left: viewportWidth/2 - 665/4, marginVertical:50 }}>
          <TouchableOpacity style={styles.button} onPress={()=>{submit()}}>
            <Image style={{resizeMode:"contain", height:94/2, width:665/2}} source={images.signinBtn}/>
          </TouchableOpacity>
        </View>
      );
}

function RouteLogin({navigation}:any){
    return (
        <View style={{position:"relative", left: viewportWidth/2 - 510/4, marginVertical:50 }}>
          <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Image style={{resizeMode:"contain", height:33/2, width:510/2}} source={images.signupRoute}/>
          </TouchableOpacity>
        </View>
      );
}

function ImagePickerExample() {
    const [image, setImage] = React.useState(null);
  
    React.useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={ image ? { uri: image } : images.addImg} style={{ backgroundColor: "#EEEEEE", borderRadius:75, width: 100, height: 100 }} />
        <Button color="#9e9e9e" title="Add Profile Pic" onPress={pickImage} />
      </View>
    );
  }

export default ({ navigation }:any) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
      console.log("from source", data);
      console.log('http://52.38.194.200/index.php/api/Private_api/signin/credential/'+data.name+'/password/'+data.password);
      
    fetch('http://52.38.194.200/index.php/api/Private_api/signin/credential/'+data.name+'/password/'+data.password)
            .then((response) => response.json())
            .then((data) => {
                if(data && data.results[0]){
                    Alert.alert(data.results[0].username+" from "+data.results[0].country);
                }
                
            })
            .catch((error) => console.log(error.message));

  };

  return (
    <View style={{height:"100%"}}>
        
        <MenuProvider>
            <ScrollView>
                <KeyboardAwareScrollView
                contentContainerStyle={styles.container}
                style={{ backgroundColor: '#181e34' }}>
                <GoBack navigation={navigation} />
                <Logo />
                <PageTitle/>
                <View style={styles.formContainer}>
                    <Form {...{ register, setValue, validation, errors }}>
                    <Input name="name" label="Email/Username" />
                    <Input name="password" label="Password" secureTextEntry={true} />
                    
                    <SubmitBtn submit={handleSubmit(onSubmit)}/>
                    {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
                    </Form>
                    <RouteLogin navigation={navigation}/>
                </View>
                </KeyboardAwareScrollView>
            </ScrollView>
        </MenuProvider>
    </View>
  );
};

const triggerStyles = {
    triggerText: {
        color: '#000',
        fontSize: 16,
    fontWeight: 'bold',
      paddingTop: 10
    },
    triggerWrapper: {
      padding: 5,
      backgroundColor: 'fff',
      borderColor: "#c0cbd3",
      borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRadius: 0,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    
    },
    triggerTouchable: {
      activeOpacity: 70,
    }
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  back: {
      position: "absolute",
      left: 20,
      top: 80,
      height: 25,
      width: 27,
  },
  logo: {
    position: "relative",
    left: viewportWidth/2 - 233/4 ,
    marginTop: 80,
    marginBottom:20,
},
pageTitle: {
    position: "relative",
    left: 50 ,
    marginTop: 8,
    marginBottom:30,
},
  label: {
      marginTop: 2,
      color: '#c0cbd3',
        fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
  button: {
  },
});