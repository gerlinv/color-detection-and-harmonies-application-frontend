import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    space: {
        height: 20,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        margin: 20,
        flex: 1
    },
    oneButton: {
        margin: 20,
        width: 150
    },
    buttonText: {
        fontSize: 10
    },
    snackBarWrapper: {
        top: 0,
        zIndex: 1000
    },
    snackBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginTop: '50%'
    },
    loadingContainer: {
        marginTop: '75%'
    },
    colorsTableContainer: {
        backgroundColor: 'white'
    },
    commentInput: {
        backgroundColor: 'white',
        width: '90%'
    },
    listAccordion: {
        textTransform: 'capitalize',
        backgroundColor: 'white'
    }
});

export default styles;
