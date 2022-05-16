import {View} from 'react-native';
import * as React from 'react';
import * as ImagePicker from 'expo-image-picker';
import Styles from './Styles'
import {Button} from 'react-native-paper';
import ColorDisplay from '../../components/ColorDisplay';

const ChoosePhotoScreen = (props) => {
    const {previousColor} = props.route.params;

    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({base64: true});
        if (!result.cancelled) {
            const base64 = 'data:image/jpeg;base64,' + result.base64;
            props.navigation.navigate('Chosen photo', {img: base64, previousColor: previousColor});
        }
    }

    const openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }
        const result = await ImagePicker.launchCameraAsync({base64: true});
        if (!result.cancelled) {
            const base64 = 'data:image/jpeg;base64,' + result.base64;
            props.navigation.navigate('Chosen photo', {img: base64, previousColor: previousColor});
        }
    }

    return (
        <View style={Styles.screen}>
            {!!previousColor &&
                <><View style={Styles.space}/>
                    <ColorDisplay name={previousColor.name} rgb={previousColor.rgb} hue={previousColor.hue}
                                  lines={false} white={false}/>
                    <View style={Styles.space}/>
                </>
            }
            <View style={Styles.buttonContainer}>
                <Button mode="contained"
                        onPress={showImagePicker}>
                    Select an image
                </Button>
                <View style={Styles.space}/>
                <Button mode="contained"
                        onPress={openCamera}>
                    Open camera
                </Button>
                <View style={Styles.space}/>
                <Button mode="contained"
                        onPress={() => props.navigation.navigate('Saved Colors', {editable: false, color1: previousColor})}>
                    Saved colors
                </Button>
                <View style={Styles.space}/>
                <Button mode="contained" onPress={() => props.navigation.goBack()}>Back</Button>
            </View>
        </View>
    );
}

export default ChoosePhotoScreen;
