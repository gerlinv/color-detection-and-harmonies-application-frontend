import {View} from 'react-native';
import * as React from 'react';
import {Component} from 'react';
import Styles from './Styles'
import {Button, Headline} from 'react-native-paper';

export default class HomeScreen extends Component {
    render() {
        return (
            <View style={Styles.viewContainer}>
                <Headline style={Styles.headline}>Color Detection and Harmonies Application</Headline>
                <View style={Styles.space}/>
                <View style={Styles.buttonsContainer}>
                    <Button mode="contained"
                            onPress={() => this.props.navigation.navigate('Choose a photo', {color: ''})}>
                        Choose a photo
                    </Button>
                    <View style={Styles.space}/>
                    <Button mode="contained"
                            onPress={() => this.props.navigation.navigate('Saved Colors', {editable: true})}>
                        Saved colors
                    </Button>
                    <View style={Styles.space}/>
                    <Button mode="contained"
                            onPress={() => this.props.navigation.navigate('Saved Harmonies', {edited: ''})}>
                        Saved harmonies
                    </Button>
                    <View style={Styles.space}/>
                    <Button mode="outlined"
                            onPress={() => this.props.navigation.navigate('About')}>
                        About
                    </Button>
                </View>
            </View>
        )
    }
}
