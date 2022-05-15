import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
    },
    space: {
        height: 20
    },
    buttonStyle: {
        width: 200,
        alignSelf: 'center'
    },
    snackBarWrapper: {
        top: 0,
        zIndex: 1000
    },
    snackBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    commentInput: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center'
    }
});

export default styles;
