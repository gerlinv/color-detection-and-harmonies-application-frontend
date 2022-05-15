import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    space: {
        height: 20,
    },
    buttonText: {
        fontSize: 10
    },
    snackBarColor: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    snackBarPosition: {
        top: 0,
        zIndex: 1000
    },
    buttonStyle: {
        margin: 5,
        flex: 1
    },
    buttonMiddleStyle: {
        margin: 5,
        flex: 2
    },
    preciseColorDetection: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    preciseColorDetectionText: {
        margin: 10
    },
    centerContainer: {
        marginTop: '75%'
    }
});

export default styles;
