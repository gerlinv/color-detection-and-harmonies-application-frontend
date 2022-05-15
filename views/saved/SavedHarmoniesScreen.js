import {Alert, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react';
import {deleteColorHarmony, getHarmonies, getHarmoniesColors} from './ApiRequest';
import {ActivityIndicator, Button, Divider, List, Snackbar} from 'react-native-paper';
import Moment from 'moment';
import Harmony from '../../components/Harmony';
import Color from '../../components/Color';
import Styles from './Styles';

const SavedHarmoniesScreen = (props) => {
    let {edited} = props.route.params;

    const [harmonies, setHarmonies] = useState(undefined);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        updateList();
    }, [edited]);

    const updateList = (() => {
        getHarmonies(props).then(data => {
            const harmoniesList = [];
            data.map((row) => {
                harmoniesList.push(new Harmony({
                    'id': row.id,
                    'ana': row.ana,
                    'comp': row.comp,
                    'mono': row.mono,
                    'neutral': row.neutral,
                    'date': row.date,
                    'comment': row.comment
                }))
            });
            setHarmonies(harmoniesList);
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    });

    const navigateToHarmonies = (harmony) => {
        getHarmoniesColors(props, harmony.id).then(data => {
            const val1 = data['val1'];
            const val2 = data['val2'];
            const color1 = new Color({
                'name': val1['name'],
                'rgb': val1.rgb,
                'hue': val1.hue,
                'date': val1.date,
                'comment': val1.comment
            });
            const color2 = new Color({
                'name': val2.name,
                'rgb': val2.rgb,
                'hue': val2.hue,
                'date': val2.date,
                'comment': val2.comment
            });
            return props.navigation.navigate('Harmonies', {val1: color1, val2: color2, savedHarmonies: harmony});
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    };

    const deleteColorHarmonyHandler = (id) => {
        deleteColorHarmony(id).then(res => {
            if (res) {
                setVisible(true);
                const newHarmonies = harmonies.filter(d => d.id !== id)
                setHarmonies(newHarmonies);
            } else {
                Alert.alert('Error', error.message);
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const backButton = () => {
        return (
            <View style={Styles.centerContainer}>
                <Button mode="contained" onPress={() => props.navigation.goBack()}>Back</Button>
            </View>)
    }

    return (
        <>
            <Snackbar visible={visible}
                      wrapperStyle={Styles.snackBarWrapper}
                      onDismiss={() => setVisible(false)}
                      duration={3000}
                      style={Styles.snackBar}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setVisible(false),
                      }}>
                Color harmony deleted!
            </Snackbar>
            {!!harmonies ?
                (harmonies.length !== 0 ? <View style={Styles.background}>
                        {harmonies.map((row) => (
                            <View key={row.id}>
                                <List.Item title={Moment(row.date).format('DD MMMM YYYY hh:mm A')}
                                           right={() =>
                                               <>
                                                   <Button mode="contained"
                                                           style={Styles.buttonStyle}
                                                           labelStyle={Styles.buttonText}
                                                           onPress={() => navigateToHarmonies(row)}>
                                                       Info
                                                   </Button>
                                                   <Button mode="contained"
                                                           style={Styles.buttonStyle}
                                                           labelStyle={Styles.buttonText}
                                                           onPress={() => deleteColorHarmonyHandler(row.id)}>
                                                       Delete
                                                   </Button>
                                               </>
                                           }/>
                                <Divider/>
                            </View>
                        ))}
                        <View style={Styles.smallSpace}/>
                        {backButton()}
                    </View>
                    :
                    <View style={Styles.noDataContainer}>
                        <Text>No data!</Text>
                        <View style={Styles.space}/>
                        {backButton()}
                    </View>)
                :
                <View style={Styles.loadingContainer}>
                    <ActivityIndicator animating={true}/>
                </View>}

        </>
    )
}

export default SavedHarmoniesScreen;
