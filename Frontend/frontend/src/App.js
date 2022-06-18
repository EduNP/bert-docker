//NÃO PRONTO PARA PRODUÇÃO!
//script em js utilizando synstatic sugar jsx, convertido pelo babel apra javascript.
//Form para mascara bert
import React from 'react';
import "./App.css"
import axios from 'axios';


/*function fetchData(text){
  axios.get("http://127.0.0.1:8080/bertMasked?inputText="+ text)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
}*/

function fetchData(text){
    let response = fetch("http://127.0.0.1:8080/bertMasked?inputText="+ text);
    /*if (response.status !== 200)
    {
        alert("Erro: Response Status != 200");
        return null;
    }*/
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
      let result = fetchData(this.state.inputText);
      console.log(result)
  }

  render(){
      return (
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.inputText} onChange={this.handleChange}></input>
              <input type="submit" value="Pesquisar"/>
          </form>
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
