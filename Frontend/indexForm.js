var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//NÃO PRONTO PARA PRODUÇÃO!
//script em js utilizando synstatic sugar jsx, convertido pelo babel apra javascript.
//Form para mascara bert
function fetchData(text) {

    var response = fetch("http://localhost/bertMasked?inputText" + text);
    if (response !== 200) {
        alert("Erro: Response Status != 200");
        return null;
    }
    console.log(response);
    return response;
}

var MaskForm = function (_React$Component) {
    _inherits(MaskForm, _React$Component);

    function MaskForm(props) {
        _classCallCheck(this, MaskForm);

        var _this = _possibleConstructorReturn(this, (MaskForm.__proto__ || Object.getPrototypeOf(MaskForm)).call(this, props));

        _this.state = { inputText: 'The capital of France is [MASK].' };

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(MaskForm, [{
        key: "handleChange",
        value: function handleChange(event) {
            this.setState({ inputText: event.target.value });
        }
    }, {
        key: "handleSubmit",
        value: function handleSubmit(event) {
            event.preventDefault();
            fetchData(this.state.inputText);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement("input", { type: "text", value: this.state.inputText, onChange: this.handleChange }),
                React.createElement("input", { type: "submit", value: "Rodar" })
            );
        }
    }]);

    return MaskForm;
}(React.Component);

function App() {
    return React.createElement(
        "div",
        null,
        React.createElement(
            "h1",
            null,
            "M\xE1scara Bert"
        ),
        React.createElement(MaskForm, null)
    );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));