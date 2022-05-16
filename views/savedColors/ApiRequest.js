import {Alert} from 'react-native';
import GLOBAL from "../../components/Global";

export const getColors = (props) => {
    return fetch(GLOBAL.API_URL + "colors", {
        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .catch(error => {
            props.navigation.navigate('Home');
            Alert.alert('Error', error.message);
        });
}

export const deleteColorById = async (id) => {
    return await fetch(GLOBAL.API_URL + "colors", {
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

export const updateColorById = async (id, comment) => {
    return await fetch(GLOBAL.API_URL + "colors", {
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
