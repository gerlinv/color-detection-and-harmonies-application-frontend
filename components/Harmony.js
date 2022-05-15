import {Component} from 'react';

export default class Harmony extends Component {
    constructor(props) {
        super(props);
        this.id = props ? props.id : '';
        this.analogous = props ? props.ana : 0;
        this.complimentary = props ? props.comp : 0;
        this.monochromatic = props ? props.mono : 0;
        this.neutral = props ? props.neutral : 0;
        this.date = props ? props.date : new Date();
        this.comment = props ? props.comment : '';
    }
}
