import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import About from '../components/About';

function PageHome({restBase, handleDisplayLoading}) {
    const restPath = restBase + 'pages/6?acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [matches, setMatches] = useState(false);

    // API call
    useEffect(() => {
        handleDisplayLoading();
        setTimeout(() => {
            const fetchData = async () => {
                const response = await fetch(restPath)
                if ( response.ok ) {
                    const data = await response.json()
                    setData(data)
                    setLoadStatus(true)
                } else {
                    setLoadStatus(false)
                }
            }
            fetchData()
        }, 1300)

    }, [restPath])

    // Media query
    function checkDesktop(e) {
        setMatches(e.matches)
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 800px)');
        mediaQuery.addEventListener('change', checkDesktop);
        return () => mediaQuery.removeEventListener('change', checkDesktop);
      })

    return (
        <>
            {isLoaded ?
                <>
                <section className='landing-section' id="landing-section">
                     <div class="letters">
                        <span class="letter">C</span>
                        <span class="letter">R</span>
                        <span class="letter">Y</span>
                        <span class="letter">S</span>
                        <span class="letter">T</span>
                        <span class="letter">A</span>
                        <span class="letter">L</span>
                        <span class="letter">{matches ? "" : <br></br> }</span>
                        <span class="letter">C</span>
                        <span class="letter">H</span>
                        <span class="letter">E</span>
                        <span class="letter">N</span>
                        <span class="letter">.</span>
                    </div>
                    <div className="job-title" >
                        <h2 dangerouslySetInnerHTML={{__html:restData.acf.job_title}}></h2>
                    </div>
                </section>
                    <About restBase={restBase} restData={restData}></About>
                </>
            :
                <Loading />
            }
        </>
    )
}
export default PageHome