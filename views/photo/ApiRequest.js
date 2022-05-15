import {Alert} from "react-native";

const GLOBAL = require('../../components/Global');

export const getColor = async (props, img, preciseDetection, x, y) => {
    return await fetch(GLOBAL.API_URL + "colors/name", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            img: img,
            precise: preciseDetection,
            x: x,
            y: y
        })
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.navigate('Home');
            Alert.alert('Error', error.message);
        });
}

export const saveColor = async (colorName, rgb, hue, comment) => {
    return await fetch(GLOBAL.API_URL + "colors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: colorName,
            rgb: rgb,
            hue: hue,
            comment: comment
        })
    })
        .then(response => response.json())
        .catch(error => {
            Alert.alert('Error', error.message);
        });
}
