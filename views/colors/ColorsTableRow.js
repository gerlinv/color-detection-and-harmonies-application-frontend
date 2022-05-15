import * as React from 'react';
import {useState} from 'react';
import Moment from 'moment';
import {Alert, Text, View} from 'react-native';
import {Button, Divider, List, Snackbar, TextInput} from 'react-native-paper';
import Styles from './Styles';
import Color from '../../components/Color';
import {updateColorById} from "./ApiRequest";

const ColorsTableRow = (props) => {
    const {deletable, row} = props;

    const [comment, setComment] = useState(row.comment ? row.comment : '');
    const [savedComment, setSavedComment] = useState(row.comment);
    const [editCommentDisabled, setEditCommentDisabled] = useState(true);
    const [visible, setVisible] = useState(false);
    const onDismissSnackBar = () => setVisible(false);
    const onToggleSnackBar = () => setVisible(!visible);

    const commentHandler = (text) => {
        setComment(text)
        if (text === savedComment) {
            setEditCommentDisabled(true);
        } else {
            setEditCommentDisabled(false);
        }
    }

    const updateColorComment = () => {
        updateColorById(row.id, comment).then(res => {
            if (res) {
                setSavedComment(comment);
                setEditCommentDisabled(true);
                onToggleSnackBar();
            } else {
                Alert.alert('An error has occurred!')
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        });
    }

    const handleUseButton = () => {
        props.navigate(new Color({
                        'name': row.name, 'hue': row.hue,
                        'rgb': row.rgb, 'date': row.date,
                        'comment': row.comment
                    }));
    }

    const displayButtons = (row) => (
        <View style={Styles.buttonContainer}>
            {deletable && <Button style={Styles.buttonStyle}
                                  labelStyle={Styles.buttonText}
                                  disabled={editCommentDisabled}
                                  mode="contained"
                                  uppercase={false}
                                  onPress={() => updateColorComment()}>Edit</Button>}
            <Button style={!deletable ? Styles.oneButton : Styles.buttonStyle}
                    labelStyle={Styles.buttonText}
                    mode="contained"
                    uppercase={false}
                    onPress={handleUseButton}>Use</Button>
            {deletable && <Button style={Styles.buttonStyle}
                                  labelStyle={Styles.buttonText}
                                  mode="contained"
                                  uppercase={false}
                                  onPress={() => props.deleteColor(row.id)}>Delete</Button>}
        </View>
    )

    const displayColorInformation = (rgb) => (
        <View>
            <Snackbar visible={visible}
                      wrapperStyle={Styles.snackBarWrapper}
                      onDismiss={onDismissSnackBar}
                      duration={3000}
                      style={Styles.snackBar}
                      action={{
                          label: 'Dismiss',
                          onPress: () => setVisible(false),
                      }}>
                Comment changed!
            </Snackbar>
            <View style={Styles.centerContainer}>
                <View style={[Styles.circle, {backgroundColor: "rgb" + rgb}]}/>
            </View>
            <View style={Styles.centerContainer}>
                <View style={Styles.space}/>
                <Text>RGB: {row.rgb}</Text>
                <View style={Styles.space}/>
                <Text>Hue: {row.hue}</Text>
                <View style={Styles.space}/>
                <Text>Date: {Moment(row.date).format('DD MMMM YYYY hh:mm A')}</Text>
                <View style={Styles.space}/>
                <TextInput
                    outlineColor={'rgba(0, 0, 0, 0.12)'}
                    style={Styles.commentInput}
                    multiline={true}
                    maxLength={150}
                    disabled={!deletable}
                    mode="outlined"
                    label="Comment"
                    value={comment}
                    onChangeText={(text) => commentHandler(text)}
                />
                {displayButtons(row)}
            </View>
        </View>
    )

    return (
        <List.Section>
            <List.Accordion style={Styles.listAccordion}
                            title={<Text>{row.name}</Text>}
                            description={Moment(row.date).format('DD MMMM YYYY')}>
                <Divider/>
                <List.Item title={() => displayColorInformation(row.rgb)}/>
            </List.Accordion>
        </List.Section>
    );
}

export default ColorsTableRow;
