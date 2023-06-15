// Development Components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import PageHome from './pages/PageHome';
import PageIndividualProject from './pages/PageIndividualProject';

function App() {
  const restBase = 'https://crystalchen.ca/wp-portfolio/wp-json/wp/v2/'
  const [displayLoading, setDisplayLoading] = useState(true);
  
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

  function handleDisplayLoading() {
    setDisplayLoading(false);
  }

  return (
    <BrowserRouter>
      <div className='site' id='home'>
        <Header restBase={restBase} displayLoading={displayLoading}/>
        <main>
          <Routes>
            <Route path="/" exact element={<PageHome restBase={restBase} handleDisplayLoading={handleDisplayLoading}/>}/>
            <Route path="/" exact element={<PageIndividualProject restBase={restBase} handleDisplayLoading={handleDisplayLoading}/>}/>
          </Routes>
          <Sidebar restBase={restBase}/>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
