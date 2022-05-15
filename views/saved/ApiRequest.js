import {Alert} from "react-native";

const GLOBAL = require('../../components/Global');

export const getHarmonies = (props) => {
    return fetch(GLOBAL.API_URL + "harmonies", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.navigate('Home');
            Alert.alert('Error', error.message);
        });
}

export const getHarmoniesColors = (props, id) => {
    return fetch(GLOBAL.API_URL + "harmonies/colors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.navigate('Home');
            Alert.alert('Error', error.message);
        });
}

export const deleteColorHarmony = async (id) => {
    return await fetch(GLOBAL.API_URL + "harmonies", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id
        })
    })
        .then(res => res.ok)
        .catch(error => {
            Alert.alert('Error', error.message);
        });
}
