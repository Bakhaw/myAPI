let express    = require('express');
let app        = express();
let bodyParser = require('body-parser');


app.use(bodyParser.json());// formater en JSON pour que le navigateur comprenne que c'est du JSON
app.use(bodyParser.urlencoded({extended : false}));

let ingredients = [
  {
  "id" : "232kHk",
  "text": "Eggs"
  },
  {
    "id" : "dkP345",
    "text": "Milk"
  },
  {
    "id" : "C931kZ",
    "text": "Chocolate"
  }
];


app.get('/', (req, res) => {
  res.send('Ma première API');
});

app.get('/ingredients', (req, res) => {
  res.send(ingredients);
});

app.post('/ingredients', (req, res) => {
  let ingredient = req.body;
  if (!ingredient || ingredient.text === "") {
    res.status(500).send({"error" : "ingrédient non valable"});
  } else {
    ingredients.push(ingredient);
    res.status(200).send(ingredients);
  }
});

app.put('/ingredients/:id', (req, res) => {
  // let id = req.params.id;
  let newText = req.body.text;
  if (!newText || newText === "") {
    res.status(500).send({error: 'il doit y avoir du texte'});
  } else {
    let objectFound = false;
    for (var x = 0; x < ingredients.length; x++) {
      let ing = ingredients[x];
      if (ing.id === req.params.id) {
        ing.text = newText;
        objectFound = true;
        break;
      }
    }
    if (!objectFound) {
      res.status(500).send({error: 'il doit y avoir du texte'});
    } else {
      res.send(ingredients);
    }
  }
});

app.listen(4444, () => {
  console.log('server ok!');
});
