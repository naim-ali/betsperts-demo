
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


const Countries = ({setCountry}:any) => {

    const [countries, setCountries] = useState();
        useEffect(() => {
        fetch('http://52.38.194.200/index.php/api/Private_api/countries')
            .then((response) => response.json())
            .then((data) => setCountries(data.results))
            .catch((error) => console.log(error.message));
        }, []);
        return countries && countries.map(c => {
            return(
                <MenuOption style={{height: 50}} key={c.code} text={c.name}
                    onSelect={() => setCountry({code: c.code, name: c.name})
                }/>
            )
        }) || null
}


const States = ({countryCode, setState}:any) => {
    const [states, setStates] = useState();
        useEffect(() => {
        fetch('http://52.38.194.200/index.php/api/Private_api/states/code/'+countryCode)
            .then((response) => response.json())
            .then((data) => {setStates(data.results), console.log(data, "is retire")})
            .catch((error) => console.log(error.message));
        }, []);
        return states && states.map(s => {
            return(
                <MenuOption style={{height: 60}} key={s.objectId} text={s.Subdivision_Name}
                    onSelect={() => setState(s.Subdivision_Name)
                }/>
            )
        }) || null;
}


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
            <Image style={{resizeMode:"contain", height:57/2, width:124/2}} source={images.signup}/>
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
            <Image style={{resizeMode:"contain", height:94/2, width:665/2}} source={images.signupBtn}/>
          </TouchableOpacity>
        </View>
      );
}

function RouteLogin({navigation}:any){
    return (
        <View style={{position:"relative", left: viewportWidth/2 - 510/4, marginVertical:50 }}>
          <TouchableOpacity style={styles.button} onPress={()=>{}}>
            <Image style={{resizeMode:"contain", height:33/2, width:510/2}} source={images.signinRoute}/>
          </TouchableOpacity>
        </View>
      );
}



function ImagePickerExample({image, setImage}:any) {
    
  
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
  
      if (!result.cancelled) {
        setImage(result);
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View>
          <TouchableOpacity  onPress={()=>{pickImage()}}>
            <Image source={ image && image.uri ? { uri: image.uri } : images.addImg} style={{ backgroundColor: "#EEEEEE", borderRadius:75, width: 100, height: 100 }} />
          </TouchableOpacity>
        </View>
        
        <Button color="#9e9e9e" title="Add Profile Pic" onPress={pickImage} />
      </View>
    );
  }

export default ({ navigation }:any) => {
  const { handleSubmit, register, setValue, errors } = useForm<FormData>();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [image, setImage] = React.useState(null);

  const onSubmit = (data: FormData) => {

    if(!country.name || !state){
        Alert.alert("Please select a country and a state");
        return;
    }

    if(!image){
        Alert.alert("Please select an image");
        return;
    }

    let formData = {"username":data.name,"email":data.email,"password":data.password, "country":country.name, "state":state};

    const payload = createFormData(image, formData);

    postData('http://52.38.194.200/index.php/api/Private_api/signup', 
    formData)
    .then(data => {
      Alert.alert(data.status); // JSON data parsed by `data.json()` call
    });
    
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
                <ImagePickerExample setImage={setImage} image={image}/>
                <View style={styles.formContainer}>
                    <Form {...{ register, setValue, validation, errors }}>
                    <Input name="name" label="username " />
                    <Input name="email" label="Email" />
                    <Input name="password" label="Password" secureTextEntry={true} />
                    <Input name="vpassword" label="Verify Password" secureTextEntry={true } />
                    

                    <Text style={styles.label}>Select country</Text> 
                    <Menu renderer={SlideInMenu}>
                    <MenuTrigger text={country && country.name} customStyles={triggerStyles} />
                    <MenuOptions>
                        <ScrollView style={{ maxHeight: viewportHeight - 80 }}>
                            <Countries setCountry={setCountry}/>
                        </ScrollView>
                    </MenuOptions>
                    </Menu>

                    <Text style={{...styles.label, marginTop:20}}>Select state</Text>
                    <Menu renderer={SlideInMenu}>
                    <MenuTrigger text={state} customStyles={triggerStyles} />
                    <MenuOptions>
                        <ScrollView style={{ maxHeight: viewportHeight - 80}}>
                            {country && <States countryCode={country.code} setState={setState} />}
                        </ScrollView>
                    </MenuOptions>
                    </Menu> 
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

const createFormData = (photo, body) => {

    const data = new FormData();
  
    data.append("photo", {
      name: "profile",
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };


async function postData(url: any, data:any) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }