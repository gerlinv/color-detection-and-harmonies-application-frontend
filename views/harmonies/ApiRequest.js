import GLOBAL from "../../components/Global";
import {Alert} from "react-native";

export const getHarmonies = async (props, val1, val2) => {
    return await fetch(GLOBAL.API_URL + "harmonies/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            val1: val1,
            val2: val2
        })
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.goBack();
            Alert.alert('Error', error.message);
        });
}

export const addColorHarmony = async (props, val1, val2, harmonies, comment) => {
    return await fetch(GLOBAL.API_URL + "harmonies", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rgb1: val1.rgb,
            rgb2: val2.rgb,
            name1: val1.name,
            name2: val2.name,
            hue1: val1.hue,
            hue2: val2.hue,
            ana: harmonies.analogous,
            comp: harmonies.complimentary,
            mono: harmonies.monochromatic,
            neutral: harmonies.neutral,
            comment: comment
        })
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.goBack();
            Alert.alert('Error', error.message);
        });
}

export const updateColorHarmony = async (id, comment) => {
    return await fetch(GLOBAL.API_URL + "harmonies", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            comment: comment
        })
    })
        .then(res => res.ok)
        .catch(error => {
            Alert.alert('Error', error.message);
        });
}
