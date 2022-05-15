import {Alert, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {addColorHarmony, getHarmonies, updateColorHarmony} from './ApiRequest';
import Styles from './Styles';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Button, Divider, List, Snackbar, TextInput} from 'react-native-paper';
import Harmony from '../../components/Harmony';
import ColorDisplay from "../../components/ColorDisplay";

const HarmoniesScreen = (props) => {
    const {val1, val2, savedHarmonies} = props.route.params;

    const [hh, setHh] = useState(savedHarmonies);
    const [comment, setComment] = useState(!!savedHarmonies.id ? savedHarmonies.comment : '');

    const [informativeSnackbar, setInformativeSnackbar] = useState(true);
    const onDismissSnackBar = () => setInformativeSnackbar(false);

    const [savedSnackBar, setSavedSnackBar] = useState(false);
    const onDismissSavedSnackBar = () => setSavedSnackBar(false);

    const [commentSnackBar, setCommentSnackBar] = useState(false);
    const onDismissCommentSnackBar = () => setCommentSnackBar(false);

    const [colorHarmonySaved, setColorHarmonySaved] = useState(false);

    const [editDisabled, setEditDisabled] = useState(true);
    const [savedColor, setSavedComment] = useState(!!savedHarmonies.id ? savedHarmonies.comment : '');

    if (!savedHarmonies.id) {
        useEffect(() => {
            getHarmonies(props, val1.rgb, val2.rgb).then(data => {
                setHh(new Harmony({
                    'ana': data.ana,
                    'comp': data.comp,
                    'mono': data.mono,
                    'neutral': data.neutral
                }))
            }).catch(error => {
                Alert.alert('Error', error.message);
            });
        }, []);
    }

    const commentHandler = (text) => {
        setComment(text)
        if (text === savedColor) {
            setEditDisabled(true);
        } else {
            setEditDisabled(false);
        }
    }

    const updateColorHarmonyComment = () => {
        updateColorHarmony(savedHarmonies.id, comment).then(res => {
            if (res) {
                setInformativeSnackbar(false);
                setSavedComment(comment);
                setEditDisabled(true);
                setCommentSnackBar(true);
            } else {
                Alert.alert('Error', error.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const saveColorHarmonyHandler = () => {
        addColorHarmony(props, val1, val2, hh, comment).then(data => {
            if (data['success']) {
                setInformativeSnackbar(false);
                setColorHarmonySaved(true);
                setSavedSnackBar(true);
            } else {
                Alert.alert('Error', error.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const circularProgressTintColor = (val) => {
        if (0 <= val && val <= 10) {
            return 'rgb(0, 255, 127)';
        } else if (11 <= val && val <= 49) {
            return 'rgb(255, 226, 0)';
        } else {
            return 'rgb(255, 61, 0)';
        }
    }

    return (
        <>
            <Snackbar visible={informativeSnackbar}
                      onDismiss={onDismissSnackBar}
                      duration={7000}
                      wrapperStyle={Styles.snackBarWrapper}
                      style={Styles.snackBar}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setInformativeSnackbar(false),
                      }}>
                NB! The lower the number, the more harmonious chosen colors are!
            </Snackbar>
            <Snackbar visible={savedSnackBar}
                      onDismiss={onDismissSavedSnackBar}
                      duration={5000}
                      wrapperStyle={Styles.snackBarWrapper}
                      style={Styles.snackBar}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setSavedSnackBar(false),
                      }}>
                Color harmony saved!
            </Snackbar>
            <Snackbar visible={commentSnackBar}
                      onDismiss={onDismissCommentSnackBar}
                      duration={5000}
                      wrapperStyle={Styles.snackBarWrapper}
                      style={Styles.snackBar}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setCommentSnackBar(false),
                      }}>
                Comment changed!
            </Snackbar>
            <ScrollView>
                <View style={Styles.viewContainer}>
                    <ColorDisplay name={val1.name} rgb={val1.rgb} hue={val1.hue} comment={val1.comment} lines={true}
                                  white={true}/>
                    <ColorDisplay name={val2.name} rgb={val2.rgb} hue={val2.hue} comment={val2.comment} lines={true}
                                  white={true}/>
                    <View style={{backgroundColor: 'white'}}>
                        <List.Item
                            title={'Complimentary harmony: '}
                            right={() =>
                                <AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    backgroundWidth={15}
                                    fill={hh.complimentary === 0 ? 100 : hh.complimentary}
                                    tintColor={circularProgressTintColor(hh.complimentary)}
                                    backgroundColor={'rgba(0, 0, 0, 0.1)'}>
                                    {(_) => (<Text>{hh.complimentary}</Text>)}
                                </AnimatedCircularProgress>
                            }
                        />
                        <Divider/>
                        <List.Item
                            title={'Analogous harmony: '}
                            right={() =>
                                <AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    backgroundWidth={15}
                                    fill={hh.analogous === 0 ? 100 : hh.analogous}
                                    tintColor={circularProgressTintColor(hh.analogous)}
                                    backgroundColor={'rgba(0, 0, 0, 0.1)'}>
                                    {(_) => (<Text>{hh.analogous}</Text>)}
                                </AnimatedCircularProgress>
                            }
                        />
                        <Divider/>
                        <List.Item
                            title={'Monochromatic harmony: '}
                            right={() =>
                                <AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    backgroundWidth={15}
                                    fill={hh.monochromatic === 0 ? 100 : hh.monochromatic}
                                    tintColor={circularProgressTintColor(hh.monochromatic)}
                                    backgroundColor={'rgba(0, 0, 0, 0.1)'}>
                                    {(_) => (<Text>{hh.monochromatic}</Text>)}
                                </AnimatedCircularProgress>
                            }
                        />
                        <Divider/>
                        <List.Item
                            title={'Neutral color harmony: '}
                            right={() =>
                                <AnimatedCircularProgress
                                    size={70}
                                    width={5}
                                    backgroundWidth={15}
                                    fill={hh.neutral === 0 ? 100 : hh.neutral}
                                    tintColor={circularProgressTintColor(hh.neutral)}
                                    backgroundColor={'rgba(0, 0, 0, 0.1)'}>
                                    {(_) => (<Text>{hh.neutral}</Text>)}
                                </AnimatedCircularProgress>
                            }
                        />
                        <Divider/>
                    </View>
                    <View style={Styles.space}/>
                    <TextInput
                        style={Styles.commentInput}
                        outlineColor={'rgba(0, 0, 0, 0.12)'}
                        multiline={true}
                        maxLength={150}
                        mode="outlined"
                        label="Comment"
                        value={comment}
                        onChangeText={(text) => commentHandler(text)}
                    />
                    <View style={Styles.space}/>
                    {!savedHarmonies.id &&
                        <>
                            <Button disabled={colorHarmonySaved}
                                    style={Styles.buttonStyle}
                                    mode="contained"
                                    onPress={() => saveColorHarmonyHandler()}>
                                Save harmony
                            </Button>
                            <View style={Styles.space}/>
                            <Button style={Styles.buttonStyle} mode="contained"
                                    onPress={(_) => props.navigation.goBack()}>Back</Button>
                            <View style={Styles.space}/>
                        </>}
                    {!!savedHarmonies.id &&
                        <>
                            <Button style={Styles.buttonStyle}
                                    mode="contained"
                                    disabled={editDisabled}
                                    onPress={(_) => updateColorHarmonyComment()}>
                                Edit
                            </Button>
                            <View style={Styles.space}/>
                            <Button style={Styles.buttonStyle} mode="contained"
                                    onPress={(_) => props.navigation.navigate('Saved Harmonies', {edited: savedHarmonies.id + comment})}>Back</Button>
                            <View style={Styles.space}/>
                        </>}
                </View>
            </ScrollView>
        </>
    )
}

export default HarmoniesScreen;
