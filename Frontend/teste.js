//script em js utilizando synstatic sugar jsx, convertido pelo babel apra javascript.
var user = 'Uhm';
var element = React.createElement(
  'h1',
  null,
  'Hello, ',
  user,
  '!'
);

ReactDOM.render(element, document.getElementById('root'));