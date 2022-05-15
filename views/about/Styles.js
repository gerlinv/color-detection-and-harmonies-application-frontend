import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    titleContainer: {
        marginTop: '25%',
        padding: 8,
        width: '100%',
        backgroundColor: 'rgb(50, 50, 50)'
    },
    paragraphContainer: {
        marginTop: 5,
        backgroundColor: 'rgb(50, 50, 50)',
        width: '100%',
        padding: 8
    },
    headlineTitle: {
        color: 'rgb(240, 240, 240)',
        textAlign: 'center'
    },
    headline: {
        color: 'rgb(240, 240, 240)'
    },
    activeDot: {
        backgroundColor: 'rgb(0, 119, 110)'
    },
    space: {
        height: 20
    }
});

export default styles;
