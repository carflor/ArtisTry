  // const mostViewedUrl = "https://www.wikiart.org/en/api/2/MostViewedPaintings"
  // const proxy = 'https: //github.com/turingschool-examples/cors-proxy/'


//   fetch('https://fe-cors-proxy.herokuapp.com', {
//   headers: {
//     "Target-URL": "https://randomfox.ca/floof"
//   }
// })

  export const getPaintings = () => {
    return fetch('https://fe-cors-proxy.herokuapp.com', {
      headers: {
        "Target-URL": `http://www.wikiart.org/en/App/Painting/MostViewedPaintings`
      }
    })
      .then(res => res.json())
  }; 