import {View} from 'react-native';
import * as React from 'react';
import {Text, Divider} from "react-native-paper";
import Styles from "./Styles";

const ColorDisplay = (props) => {
    return (
        <View style={{backgroundColor: props.white ? 'white' : ''}}>
            {!!props.lines && <Divider/>}
            <View style={Styles.colorDisplayContainer}>
                <View style={Styles.colorInformationContainer}>
                    <Text style={Styles.textStyle}>Name: {props.name}</Text>
                    {!!props.lines && <Divider/>}
                    <Text style={Styles.textStyle}>RGB: {props.rgb}</Text>
                    {!!props.lines && <Divider/>}
                    <Text style={Styles.textStyle}>Hue: {props.hue}</Text>
                    {!!props.comment &&
                        <>
                            {!!props.lines && <Divider/>}
                            <Text style={Styles.textStyle}>Comment: {props.comment}</Text>
                        </>}
                </View>
                {!!props.lines && <View style={Styles.verticalLine}/>}
                <View style={Styles.circleContainer}>
                    <View style={[Styles.circle, {backgroundColor: "rgb" + props.rgb}]}/>
                </View>
            </View>
            {!!props.lines && <Divider/>}
        </View>
    );
}

export default ColorDisplay;
