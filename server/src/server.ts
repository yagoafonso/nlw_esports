import express from 'express'

const app = express()

app.get('/games', (resquest, response) => {
  return response.json([]);
});

app.post('/ads', (resquest, response) =>{
  return response.status(201).json([]);
});

app.get('/games/:id/ads', (request, response) =>{
  // const gameId = request.params.id;
  return response.json([
    { id: 1, name: 'Anúncio '},
    { id: 2, name: 'Anúncio '},
    { id: 3, name: 'Anúncio '},
    { id: 4, name: 'Anúncio '},
    { id: 5, name: 'Anúncio '},

  ])
})

app.get('/ads/:id/discord', (request, response) =>{
  return response.json([
    // const adId = request.params.id;
  ])
})
app.listen(3333)