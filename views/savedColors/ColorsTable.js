import React, {Component} from 'react';
import {View} from 'react-native';
import ColorsTableRow from './ColorsTableRow';
import {Divider} from 'react-native-paper';
import Styles from './Styles';

export default class ColorsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Color', 'RGB', 'Date', '', ''],
            tableData: this.props.colors,
            editable: this.props.editable
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.colors !== prevState.colors) {
            return {tableData: nextProps.colors, editable: nextProps.editable};
        } else return null;
    }

    render() {
        const deleteColor = (id) => {
            this.props.deleteColor(id);
        }

        const navigate = (color) => {
            return this.props.navigate(color)
        }

        return (
                <View style={Styles.colorsTableContainer}>
                    {this.state.tableData.map((row) => (
                        <View key={row.id}>
                            <ColorsTableRow editable={this.state.editable}
                                            row={row}
                                            deleteColor={deleteColor}
                                            navigate={navigate}/>
                            <Divider/>
                        </View>
                    ))}
                </View>
        )
    }
}
