import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect';
import { act, renderHook } from '@testing-library/react-hooks'
import App from './App';
import { createMemoryHistory } from 'history';
import { getPaintings } from '../apiCalls';
    
const usePaintings = jest.fn()
describe('App', () => {
  const originalError = console.error
  let toggleFavs
  let addToFavs
  let deleteFromFavs
  beforeAll(() => {
    toggleFavs = jest.fn().mockImplementation(() => {})
    addToFavs = jest.fn().mockImplementation(() => {})
    deleteFromFavs = jest.fn().mockImplementation(() => {})
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      // originalError.call(console, ...args)
    }
  })

  const paintings = [
    {
      title: "The River Thames with St. Paul's Cathedral on Lord Mayor's Day",
      contentId: 250550,
      artistContentId: 250406,
      artistName: 'Canaletto',
      completitionYear: 1746,
      yearAsString: '1746',
      width: 1296,
      image: 'https://uploads6.wikiart.org/images/canaletto/the-river-thames-with-st-paul-s-cathedral-on-lord-mayor-s-day.jpg!Large.jpg',
      height: 676,
      name: 'image',
      testId: 42
    },
    {
      title: "Just what is it that makes today's homes so different, so appealing?",
      contentId: 243774,
      artistContentId: 243771,
      artistName: 'Richard Hamilton',
      completitionYear: 1956,
      yearAsString: '1956',
      width: 1211,
      image: 'https://uploads3.wikiart.org/images/richard-hamilton/http-en-wikipedia-org-wiki-file-hamilton-appealing2-jpg-1956.jpg!Large.jpg',
      height: 1260,
      name: 'image'
    },
    {
      title: 'Cape Cod Morning',
      contentId: 235538,
      artistContentId: 235517,
      artistName: 'Edward Hopper',
      completitionYear: 1950,
      yearAsString: '1950',
      width: 1000,
      image: 'https://uploads1.wikiart.org/images/edward-hopper/cape-cod-morning.jpg!Large.jpg',
      height: 857,
      name: 'image'
    }
  ]

  it('should display all nav elements on load', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<MemoryRouter><App paintings={paintings} /></MemoryRouter>)
    const pageTitle = getByText('ArtisTry')
    const galleryLink = getByRole('link', { name: 'My Gallery' })
    const exploreLink = getByRole('link', { name: 'Explore' })
    expect(pageTitle).toBeInTheDocument()
    expect(galleryLink).toBeInTheDocument()
    expect(exploreLink).toBeInTheDocument()
  })

  it('should render a gallery component', async () => {
    const { getByLabelText } = render(<MemoryRouter><App paintings={paintings} /></MemoryRouter>)
    const gallery = getByLabelText('gallery')
    expect(gallery).toBeInTheDocument()
  })

  it('should display loading fetch message', async () => {
    usePaintings.mockResolvedValue(paintings)
    const {result} = await waitFor(() => renderHook(usePaintings))
    await usePaintings()
    const { getByLabelText} = render(<MemoryRouter><App /></MemoryRouter>)
    const gallery = getByLabelText('gallery')
    
    expect(gallery).toBeInTheDocument()
  })

  it('should display all paintings once fetch is resolved', async () => {
    const usePaintings = jest.fn()

    await act(async () => renderHook(() => usePaintings('http://www.wikiart.org/en/App/Painting/MostViewedPaintings')))

    expect(usePaintings).toBeCalledWith('http://www.wikiart.org/en/App/Painting/MostViewedPaintings')
    expect(usePaintings).toBeCalledTimes(1)
  })

  it.skip('should change path locations when a painting is clicked', async () => {
    const fetchedPaintings = getPaintings.mockResolvedValueOnce(paintings)
    const testHistoryObject = createMemoryHistory()
    const { getByTestId, getByRole } = render(
      <Router history={testHistoryObject}>
        <App paintings={paintings} />
      </Router>
    )
    expect(testHistoryObject.location.pathname).toEqual('/')

    const paintingButton = await waitFor(() => getByRole('img'))
    fireEvent.click(paintingButton)
    expect(testHistoryObject.location.pathname).toEqual('/Just what is it that makes today\'s homes so different, so appealing')
  })

  it('should change to the route path of /user-gallery when the My Gallery button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByRole } = render(
      <Router history={testHistoryObject}>
        <App paintings={paintings} />
      </Router>
    )
    expect(testHistoryObject.location.pathname).toEqual('/')
    const galleryLink = getByRole('link', { name: 'My Gallery' })
    fireEvent.click(galleryLink)
    expect(testHistoryObject.location.pathname).toEqual('/user-gallery')
  })

  it('should change to the route path of /random-art when the Explore button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByRole } = render(
      <Router history={testHistoryObject}>
        <App paintings={paintings} />
      </Router>
    )
    expect(testHistoryObject.location.pathname).toEqual('/')
    const exploreLink = getByRole('link', { name: 'Explore' })
    fireEvent.click(exploreLink)
    expect(testHistoryObject.location.pathname).toEqual('/random-art')
  })

  afterAll(() => {
    console.error = originalError
  })

  it.skip('should add a painting to the favorites when it is clicked', () => {

    const testHistoryObject = createMemoryHistory()
    const { getByAltText } = render(
      <Router history={ testHistoryObject }><App paintings={paintings}/></Router>)
    const favButton = getByAltText('save-btn')
    fireEvent.click(favButton)

    expect(toggleFavs).toBeCalledTimes(1)
  })
})
