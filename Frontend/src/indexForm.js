//NÃO PRONTO PARA PRODUÇÃO!
//script em js utilizando synstatic sugar jsx, convertido pelo babel apra javascript.
//Form para mascara bert
function fetchData(text){


    let response = fetch("http://127.0.0.1/bertMasked/"+ text);
    if (response !== 200)
    {
        alert("Erro: Response Status != 200");
        return null;
    }
    console.log(response);
    return response;
}


class MaskForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {inputText: 'The capital of France is [MASK].'}
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({inputText: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault()
        fetchData(this.state.inputText);
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.inputText} onChange={this.handleChange}></input>
                <input type="submit" value="Rodar"/>
            </form>
        );
    }
}

function App(){
    return(
        <div>
            <h1>Máscara Bert</h1>
            <MaskForm></MaskForm>
        </div>
    )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);