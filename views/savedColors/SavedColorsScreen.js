import {Alert, ScrollView, Text, View} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from 'react';
import ColorsTable from "./ColorsTable";
import {ActivityIndicator, Button, Snackbar} from 'react-native-paper';
import {deleteColorById, getColors} from './ApiRequest';
import Styles from './Styles';
import Harmony from "../../components/Harmony";

const SavedColorsScreen = (props) => {
    const {editable, color1} = props.route.params;

    const [colors, setColors] = useState(undefined);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = () => setVisible(!visible);

    useEffect(() => {
        getColors(props).then(data => {
            setColors(data);
        }).catch(error => {
            Alert.alert('Error', error.message)
        });
    }, []);

    const deleteColor = (id) => {
        deleteColorById(id).then(res => {
            if (res) {
                const newColors = colors.filter(d => d.id !== id)
                setColors(newColors);
                onToggleSnackBar();
            } else {
                Alert.alert('Error', error.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const navigateToChoosePhotoScreen = (color) => {
        return props.navigation.navigate('Choose a photo', {previousColor: color});
    }

    const navigateToNextScreen = (color) => {
        if (!!color1) {
            return props.navigation.navigate('Harmonies', {val1: color1, val2: color, savedHarmonies: new Harmony()});
        } else {
            navigateToChoosePhotoScreen(color);
        }
    }

    return (
        <>
            {!!colors ?
                (colors.length !== 0 ? <>
                        <Snackbar visible={visible}
                                  wrapperStyle={Styles.snackBarWrapper}
                                  onDismiss={onDismissSnackBar}
                                  duration={3000}
                                  style={Styles.snackBar}
                                  action={{
                                      label: 'Dismiss',
                                      onPress: () => setVisible(false),
                                  }}>
                            Color deleted!
                        </Snackbar>
                        <ScrollView>
                            <ColorsTable editable={editable}
                                         colors={colors}
                                         deleteColor={deleteColor}
                                         navigate={navigateToNextScreen}/>
                            <View style={Styles.space}/>
                            <View style={Styles.centerContainer}>
                                <Button mode="contained"
                                        onPress={() => props.navigation.goBack()}>
                                    Back
                                </Button>
                            </View>
                        </ScrollView>
                    </> :
                    <View style={Styles.noDataContainer}>
                        <Text>No data!</Text>
                        <View style={Styles.space}/>
                        <View style={Styles.centerContainer}>
                            <Button mode="contained"
                                    onPress={() => props.navigation.goBack()}>
                                Back
                            </Button>
                        </View>
                    </View>)
                :
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator animating={true}/>
                </View>}
        </>
    );
}

export default SavedColorsScreen;
