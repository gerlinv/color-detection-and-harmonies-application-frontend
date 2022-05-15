import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 10
    },
    buttonStyle: {
        margin: 1
    },
    space: {
        height: 20,
    },
    smallSpace: {
        height: 20,
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    snackBarWrapper: {
        top: 0,
        zIndex: 1000
    },
    snackBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    background: {
        backgroundColor: 'white'
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        marginTop: '50%'
    },
    loadingContainer: {
        marginTop: '75%'
    }
});

export default styles;
