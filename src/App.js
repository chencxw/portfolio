// Development Components
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import PageHome from './pages/PageHome';
import AllProjectsPage from './pages/AllProjectsPage';
import PageIndividualProject from './pages/PageIndividualProject';

// Create context for restBase path
export const RestBaseContext = createContext();

function App() {
  const restBase = 'https://crystalchen.ca/wp-portfolio/wp-json/wp/v2/'
  const [displayLoadingGIF, setDisplayLoadingGIF] = useState(true);
  
  // Function to output responsive images
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

  // Helper function to display loading gif in header
  function handleDisplayLoadingGIF(booleanValue) {
    setDisplayLoadingGIF(booleanValue);
  }

  return (
    <BrowserRouter>
      <RestBaseContext.Provider value={restBase}>
        <div className='site' id='home'>
          <Header restBase={restBase} displayLoadingGIF={displayLoadingGIF}/>
          <main>
            <Routes>
              <Route path="/" exact element={<PageHome restBase={restBase} handleDisplayLoadingGIF={handleDisplayLoadingGIF} featuredImage={featuredImage} />}/>
              <Route path="/all-projects" element={<AllProjectsPage restBase={restBase} handleDisplayLoadingGIF={handleDisplayLoadingGIF} featuredImage={featuredImage} />}/>
              <Route path="/:slug" element={<PageIndividualProject restBase={restBase} handleDisplayLoadingGIF={handleDisplayLoadingGIF} featuredImage={featuredImage} />}/>
            </Routes>
            <Sidebar />
          </main>
          {displayLoadingGIF === false && <Footer />}
        </div>
      </RestBaseContext.Provider>
    </BrowserRouter>
  );
}

export default App;
