import { Component } from 'preact';

export default class Input extends Component {

    inputBarStyles = {
        position: "fixed",
        bottom: "0px",
        left: "0px",
        width: "100%",
        display: "flex"
    }

    inputStyles = {
        flex: "1",
        marginRight: "0px"
    }

    commonStyles = {
        border: "solid #7b7b7b 1px",
        background: "white",
        borderRadius: "50px",
        padding: "15px",   
        margin: "5px 5px"        
    }

    buttonStyles = {
        width: "80px"
    }

    submit = () => {
        this.props.submit(this.input.value);
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submit();
        }
    };

    render() {
        return (
            <div style={this.inputBarStyles}>
                <input ref={input => this.input = input}
                    style={{...this.commonStyles, ...this.inputStyles}}
                    placeholder="Use that keyboard here..."
                    value={this.props.value}
                    onKeyPress={this.handleKeyPress} />
                <button style={{...this.commonStyles, ...this.buttonStyles}} onClick={this.submit}>Submit</button>
            </div>
        );
    }
}