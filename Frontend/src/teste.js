//script em js utilizando synstatic sugar jsx, convertido pelo babel apra javascript.
const user = 'Uhm';
const element = (
    <h1>
      Hello, {user}!
    </h1>
  );
  

ReactDOM.render(
  element,
  document.getElementById('root')
);