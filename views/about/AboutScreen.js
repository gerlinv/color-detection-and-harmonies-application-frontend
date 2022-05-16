import React from 'react';
import {View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Colors, Headline, Paragraph, Surface} from "react-native-paper";
import {Icon} from 'react-native-elements'
import Styles from "./Styles";

const slides = [
    {
        key: 1,
        title: 'Step 1',
        text: '\u2022' + ' Choose a photo either from your gallery, take a new photo directly with your camera or pick a previously savedHarmonies color.',
        backgroundColor: '#59b2ab',
    },
    {
        key: 2,
        title: 'Step 2',
        text: '\u2022' + ' Click on a spot on the chosen photo and get information about the color.\n' +
            '\u2022' + ' Choose whether you want to select the color precisely or you want to see the overall color.\n' +
            '\u2022' + ' Optionally save the color for future usage and add a comment.\n' +
            '\u2022' + ' Saved savedColors can be viewed under \'Saved savedColors\'.\n' +
            '\u2022' + ' Move on to the next step!',
        backgroundColor: '#febe29',
    },
    {
        key: 3,
        title: 'Step 3',
        text: '\u2022' + ' Repeat the previous steps to get the second color.',
        backgroundColor: '#22bcb5',
    },
    {
        key: 4,
        title: 'Step 4',
        text: '\u2022' + ' Find out how harmonious are the chosen savedColors!\n' +
                '\u2022' + ' Optionally save the found harmonies and add a comment if needed.\n' +
                '\u2022' + ' Saved harmonies can be viewed under \'Saved harmonies\'.',
        backgroundColor: '#22bcb5',
    }
];

export default class AboutScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    _renderItem = ({item}) => {
        return (
            <View style={Styles.slide}>
                <Surface style={Styles.titleContainer}>
                    <Headline style={Styles.headlineTitle}>{item.title}</Headline>
                </Surface>
                <View style={Styles.space}/>
                <Surface style={Styles.paragraphContainer}>
                    <Paragraph style={Styles.headline}>{item.text}</Paragraph>
                </Surface>
            </View>
        );
    }

    _renderNextButton = () => {
        return (
            <View style={Styles.buttonCircle}>
                <Icon
                    name="arrow-forward"
                    color={Colors.white}
                    size={24}
                />
            </View>
        );
    };

    _renderPrevButton = () => {
        return (
            <View style={Styles.buttonCircle}>
                <Icon
                    name="arrow-back"
                    color={Colors.white}
                    size={24}
                />
            </View>
        );
    };

    _renderDoneButton = () => {
        return (
            <View style={Styles.buttonCircle}>
                <Icon
                    name="check"
                    color={Colors.green500}
                    size={24}
                />
            </View>
        );
    };

    _onDone = () => {
        return this.props.navigation.goBack();
    }

    render() {
        return (
            <AppIntroSlider
                renderItem={this._renderItem}
                data={slides}
                showPrevButton={true}
                renderNextButton={this._renderNextButton}
                renderPrevButton={this._renderPrevButton}
                renderDoneButton={this._renderDoneButton}
                activeDotStyle={Styles.activeDot}
                onDone={this._onDone}/>
        );
    }
}
