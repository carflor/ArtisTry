import React from 'react'
import { Link } from 'react-router-dom'
import usePaintings from '../Hooks/usePaintings';
import Gallery from '../Gallery/Gallery';
import '../PaintingInfo/PaintingInfo.css'
import PropTypes from 'prop-types';

function PainterInfo(props) {
  let url;
  const { artistName } = props.info;
  if(artistName !== undefined){
    if(artistName.includes('.')) {
      url = artistName.replace(/\s/g, '').replace(/\./g, '-').toLowerCase()
    } else {
      url = artistName.replace(/\s+/g, '-').replace(/\./g, '-').toLowerCase()
    }
  }
  const { paintings } = usePaintings(`http://www.wikiart.org/en/App/Painting/PaintingsByArtist?artistUrl=${url}&json=2`);

  return (
    <section className="painter-page">
      <section className="painter-nav">
        <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="painting-page-title">ArtisTry</h1>
        </Link>
        <h1 className="artist-page-name">{artistName}</h1>
        <Link to="/random-art" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="random-button">Explore</button>
        </Link>
        <Link to={"/user-gallery"} style={{ textDecoration: 'none' }}>
          <button className="my-gallery-btn" onClick={props.getUserFavorites}>My Gallery</button>
        </Link>
      </section>
      <section aria-label="gallery">
        <Gallery paintings={paintings} setSelected={props.setSelected}/>
      </section>
    </section>
  )
}

export default PainterInfo;

PainterInfo.propTypes = {
  artistName: PropTypes.string,
  favorites: PropTypes.object || PropTypes.array,
  history: PropTypes.object,
  info: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  setSelected: PropTypes.func,
  getUserFavorites: PropTypes.func
}
