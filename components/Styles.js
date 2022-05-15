import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    textStyle: {
        padding: 10
    },
    colorDisplayContainer: {
        flexDirection: 'row'
    },
    colorInformationContainer: {
        flex: 2
    },
    circleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    verticalLine: {
        height: '100%',
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
    }
});

export default styles;
