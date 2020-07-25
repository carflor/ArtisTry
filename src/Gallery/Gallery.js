import React from 'react';
import {Link} from 'react-router-dom';
import './Gallery.css';
import Painting from '../Painting/Painting';
// import PropTypes from 'prop-types';

function Gallery (props) {
  const setSelectedPainting = (painting) => {
    props.setSelected(painting)
  }

  const shuffled = props.paintings.sort(() => Math.random() - 0.5)
  const sliced = shuffled.slice(0, 50)
  const displayedPaintings = sliced.map(painting => {
    return (



        <Link
          to={ painting.title ? `/${painting.title}` : `/${painting.contentId}` }
          aria-label='painting'
          data-testid={painting.contentId}
          key={painting.contentId}
          style={{textDecoration: 'none'}}
          onClick={() => setSelectedPainting(painting)}
        >
          <Painting painting={painting} key={painting.contentId} />
        </Link>
    
    )
  })

  return (
    <section>
      {props.paintings.length === 0 && <h1>Loading Collection...</h1>}
      {props.paintings.length > 0 && 
        <section className="wrapper">
            <section className="background parralax bg1">
            </section>  
            <section className="displayed-paintings static">{displayedPaintings}
            </section>
        </section>}
    </section>
  )  
}

export default Gallery;

