import {Component} from 'preact';

export default class Input extends Component {

    submit = () => {
        this.props.submit(this.input.value);
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            this.submit();
        }
    };

    render() {
        return (
            <div>
                <input  ref={input => this.input = input}
                        placeholder="Use that keyboard here..."
                        value={this.props.value}
                        onKeyPress={this.handleKeyPress}/>
                <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}