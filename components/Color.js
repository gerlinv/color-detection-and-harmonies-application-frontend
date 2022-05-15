import {Component} from 'react';

export default class Color extends Component {
    constructor(props) {
        super(props);
        this.name = props ? props.name : '';
        this.rgb = props ? props.rgb : '';
        this.hue = props ? props.hue : '';
        this.date = props ? props.date : new Date();
        this.comment = props ? props.comment : '';
    }
}
