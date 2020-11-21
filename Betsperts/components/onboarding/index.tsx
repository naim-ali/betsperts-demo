import * as React from 'react';
import {
  Text, 
  View,
  Button,
  SafeAreaView, Dimensions, StyleSheet, ViewStyle, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import images from '../../assets/image';
import Carousel from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

interface state {
    activeIndex: number
    carouselItems: { image: string }[]
}



const carouselItems:state['carouselItems'] = [
    {
        image: images.slide1
    },
    {
        image: images.slide2
    },
    {
        image: images.slide3
    }
  ]

const renderItem = ({item, index}) => {
    return (
      <View>
           
            <Image 
                style={{resizeMode:"cover",  width: "100%" ,height:viewportHeight-200}} 
                source={item.image}  />    
           </View>
           
       
      // <View style={{
      //     backgroundColor:'floralwhite',
      //     borderRadius: 5,
      //     height: 250,
      //     padding: 50,
      //     marginLeft: 25,
      //     marginRight: 25, }}>
      //   <Text style={{fontSize: 30}}>{item.title}</Text>
      //   <Text>{item.text}</Text>
      // </View>
        //<View style={{ height: viewportHeight }} /> // or { flex: 1 } for responsive height
    );
}

const buttonStyle: ViewStyle = {
    height: 40,
    flex: 1,
    position: "absolute",
    backgroundColor: "#fff",
    borderWidth: 0,
    borderRadius: 6,
    marginTop: 200,
    width: 120,
    justifyContent: "flex-start",
    shadowRadius:2,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: {width: 0,height: 3}


}

const signUp = {
    bottom:60,
    right:60
}

const signIn = {
    bottom:60,
    left:60,
    backgroundColor: "#27D893"
}

const onboarding = ({ navigation }) => {

    const [activeIndex, updateActiveIndex ] = React.useState(0);

    return(
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel
                layout={"default"}
                data={carouselItems}
                sliderWidth={viewportWidth}
                sliderHeight = {viewportHeight-40}
                itemWidth={viewportWidth}
                itemHeight = {viewportHeight-40}
                loop={true}
                slideStyle={{marginTop:50, width: viewportWidth }}
                renderItem={renderItem}
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
                onSnapToItem = { index => updateActiveIndex(index) } />
            
            <View style={{...buttonStyle, ...signUp}}>
                <Button
                 color="black"
                    title="SIGNUP"
                    onPress={() => navigation.navigate('SignUp')}>
                </Button>
            </View>

            <View style={{...buttonStyle, ...signIn}}>
                <Button
                    color="white"
                    title="SIGN IN"
                    onPress={() => navigation.navigate('SignIn')}  
                />
            </View>

            
        </View>
    )
}

export default onboarding;