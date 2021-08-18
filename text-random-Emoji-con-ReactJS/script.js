class MoodRandomizer extends React.Component {
    constructor(props) {
        super(props);

        this.moods = [
            { name: "El alegre", "emoji": "😀" },
            { name: "El enojon", "emoji": "😠" },
            { name: "El súper enojon", "emoji": "😡" },
            { name: "El tristón", "emoji": "🙁" },
            { name: "El depre", "emoji": "☹️" },
            { name: "Eres un helado de chocolate", "emoji": "💩" }
        ];


        this.state = {
            mood: {
                name: "[ Este emoji va muy contigo, nah, broma ]",
                emoji: null
            }
        };


    }

    handleButtonClick() {
        const mood = this.moods[Math.floor(Math.random() * this.moods.length)];
        this.setState({ mood });
    }

    render() {
        return /*#__PURE__*/ (
            React.createElement("div", { className: "Mood" }, /*#__PURE__*/
                React.createElement("div", { className: "Mood__emoji" }, this.state.mood.emoji), /*#__PURE__*/
                React.createElement("div", { className: "Mood__name" }, this.state.mood.name), /*#__PURE__*/
                React.createElement("button", { className: "Mood__button", onClick: this.handleButtonClick.bind(this) }, "Ver otro")));


    }
}


// Solo es el llamado para crear el documento del contenedor
React.render( /*#__PURE__*/ React.createElement(MoodRandomizer, null), document.getElementById('mood-container'));