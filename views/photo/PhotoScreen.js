import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, Dimensions, Image, ScrollView, TouchableWithoutFeedback, View} from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import Styles from './Styles';
import {ActivityIndicator, Button, Snackbar, Switch, Text, TextInput} from 'react-native-paper';
import {getColor, saveColor} from './ApiRequest';
import Color from '../../components/Color';
import Harmony from '../../components/Harmony';
import ColorDisplay from '../../components/ColorDisplay';

async function resizeImage(img, imgWidth, imgHeight) {
    return await ImageManipulator.manipulateAsync(
        img, [{resize: {height: imgHeight, width: imgWidth}}], {base64: true}
    );
}

const PhotoScreen = (props) => {
    const {previousColor, img} = props.route.params;

    const [loaded, setLoaded] = useState(false);
    const [comment, setComment] = useState('');
    const [resizedImage, setResizedImage] = useState(undefined);
    const [preciseDetection, setPreciseDetection] = useState(true);
    const [colorSaved, setColorSaved] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [colorName, setColorName] = useState(undefined);
    const [rgb, setRgb] = useState(undefined);
    const [hue, setHue] = useState(undefined);
    const [actualColor, setActualColor] = useState(new Color());

    const onToggleSwitch = () => setPreciseDetection(!preciseDetection);

    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = () => setVisible(!visible);

    useEffect(() => {
        Image.getSize(img, (width, height) => {
            const screenWidth = Dimensions.get('window').width
            const scale = width / screenWidth
            const imgHeight = height / scale
            resizeImage(img, screenWidth, imgHeight).then(data => {
                setImageWidth(screenWidth);
                setImageHeight(imgHeight);
                setResizedImage(data);
            }).catch(error => {
                Alert.alert('Error', error.message);
            });
        })
    }, [img])

    const onPressHandler = (e) => {
        const x = e.nativeEvent.locationX ? e.nativeEvent.locationX : e.nativeEvent.offsetX;
        const y = e.nativeEvent.locationY ? e.nativeEvent.locationY : e.nativeEvent.offsetY;
        getColor(props, resizedImage.base64, preciseDetection, x, y).then(data => {
            setActualColor(new Color({name: data['color'], rgb: data['rgb'], hue: data['hue']}))
            setColorName(data['color']);
            setRgb(data['rgb']);
            setHue(data['hue'])
            setColorSaved(false);
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const saveColorHandler = (colorName, rgb, hue) => {
        saveColor(colorName, rgb, hue, comment).then(data => {
            if (data['success']) {
                const currentColor = actualColor;
                currentColor.comment = comment;
                setActualColor(currentColor);
                setColorSaved(true);
                onToggleSnackBar();
            } else {
                Alert.alert('Error', error.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    return (
        <>
            <Snackbar visible={visible}
                      onDismiss={onDismissSnackBar}
                      duration={3000}
                      style={Styles.snackBarColor}
                      wrapperStyle={Styles.snackBarPosition}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setVisible(false),
                      }}>
                Color saved!
            </Snackbar>
            <ScrollView>
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <View>
                        {!resizedImage &&
                            <View style={Styles.centerContainer}>
                                <ActivityIndicator animating={true}/>
                            </View>
                        }
                        {!!resizedImage &&
                            <View style={Styles.imageContainer}>
                                <TouchableWithoutFeedback onPress={onPressHandler}>
                                    <Image
                                        onClick={onPressHandler}
                                        source={{uri: resizedImage.uri}}
                                        style={{width: imageWidth, height: imageHeight}}
                                        onLoad={() => setLoaded(true)}/>
                                </TouchableWithoutFeedback>
                            </View>
                        }
                        {!!loaded ? (<><View style={Styles.space}/>
                                <ColorDisplay name={actualColor.name} rgb={actualColor.rgb} hue={actualColor.hue}
                                              lines={true} white={true}/>
                                <View style={Styles.space}/>
                                <TextInput
                                    outlineColor={'rgba(0, 0, 0, 0.12)'}
                                    style={{backgroundColor: 'white', width: imageWidth * 0.9, alignSelf: 'center'}}
                                    multiline={true}
                                    maxLength={150}
                                    mode="outlined"
                                    label="Comment"
                                    value={comment}
                                    onChangeText={(text) => setComment(text)}
                                />
                                <View style={Styles.preciseColorDetection}>
                                    <Text style={Styles.preciseColorDetectionText}>Precise color detection</Text>
                                    <Switch value={preciseDetection} onValueChange={onToggleSwitch}/>
                                </View>
                                <View style={Styles.buttonsContainer}>
                                    <Button style={Styles.buttonStyle}
                                            labelStyle={Styles.buttonText}
                                            mode="contained" onPress={() => props.navigation.goBack()}
                                    >Back</Button>
                                    <View style={Styles.space}/>
                                    <>
                                        <Button style={Styles.buttonMiddleStyle}
                                                labelStyle={Styles.buttonText}
                                                disabled={!colorName || colorSaved}
                                                mode="contained"
                                                onPress={() => saveColorHandler(colorName, rgb, hue)}>
                                            Save color</Button>
                                        <View style={Styles.space}/>
                                    </>
                                    {!previousColor &&
                                        <Button style={Styles.buttonStyle}
                                                labelStyle={Styles.buttonText}
                                                disabled={!rgb}
                                                mode="contained"
                                                onPress={() =>
                                                    props.navigation.navigate('Choose a photo',
                                                        {previousColor: actualColor})
                                                }>Next</Button>}
                                    {!!previousColor &&
                                        <Button style={Styles.buttonStyle}
                                                labelStyle={Styles.buttonText}
                                                disabled={!colorName}
                                                mode="contained"
                                                onPress={() => props.navigation.navigate('Harmonies', {
                                                    val1: actualColor, val2: previousColor, savedHarmonies: new Harmony()
                                                })}>Next</Button>
                                    }
                                </View>
                                {!!previousColor && !!colorName &&
                                    <>
                                        <View style={Styles.space}/>
                                        <Text style={{textAlign: 'center'}}>Click next to see harmonies!</Text>
                                        <View style={Styles.space}/>
                                    </>}</>)
                            :
                            <></>
                        }
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default PhotoScreen;
