//NÃO PRONTO PARA PRODUÇÃO!
//Form para mascara bert
import React from 'react';
import "./App.css"

function fetchData(text){
    return fetch("http://127.0.0.1:8080/bertMasked?inputText="+ text)
    .then(function(response){
      if(response.ok){
        //recebe a resposta, divide os dados em
        let responseType = response.headers.get("content-type");
        if(responseType && responseType.indexOf("application/json") !== 1){
          return response.json().then(function(json){
            return json;
          });
        }

      }else{
        console.log("Ocorreu um erro.")
      }
    })
    .catch(function(error){
      console.log("Ocorreu um erro na operacao fetch: " + error.message);
    });
}

class MaskForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {inputText: 'Capital do Brasil é [MASK].', result: null, loading: false}
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
      this.setState({inputText: event.target.value});
      
  }

  handleSubmit(event){
      event.preventDefault();
      this.setState({loading: true});
      fetchData(this.state.inputText).then(response => this.setState({result: response, loading:false}));
  }

  render(){
      let displayResponse;
      if(this.state.result != null){
        displayResponse = <div>{this.state.result.input}
          <br/>1 {this.state.result.prediction[0]}
          <br/>2 {this.state.result.prediction[1]}
          <br/>3 {this.state.result.prediction[2]}
          <br/>4 {this.state.result.prediction[3]}
          <br/>5 {this.state.result.prediction[4]}
          {this.state.result.error}</div>;
      }
      
      let loadingBar;
      if(this.state.loading === true){
        loadingBar = <h2>CARREGANDO...</h2>
      }else{
        loadingBar = "";
      }

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.inputText} onChange={this.handleChange}></input>
              <input type="submit" value="Pesquisar"/>
          </form>
          {loadingBar}
          <h3>{displayResponse}</h3>
        </div>
      );
  }
}

function App(){
  return(
      <div class="main_container">
          <h1>Autocompletar com Bert</h1>
          <MaskForm></MaskForm>
      </div>
  )
}


export default App;
