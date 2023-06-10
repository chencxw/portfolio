// Development Components
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Header from './components/Header';

// Pages
import PageHome from './pages/PageHome';

function App() {
  const restBase = 'https://crystalchen.ca/wp-portfolio/wp-json/wp/v2/'
  
  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  return (
    <BrowserRouter>
      <div className='site'>
        <Header restBase={restBase}/>
        <main>
          <Routes>
            <Route path="/" exact element={<PageHome restBase={restBase} />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
