import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import About from '../components/About';
import Contact from '../components/Contact';

function PageHome({restBase, handleDisplayLoading}) {
    const restPath = restBase + 'pages/6?acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [matches, setMatches] = useState(false);
    const query = "(min-width: 800px)";

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
        }, 500)

    }, [restPath])

    // Media query
    function checkDesktop(e) {
        setMatches(e.matches)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', checkDesktop);
        return () => mediaQuery.removeEventListener('change', checkDesktop);
    })

    return (
        <>
            {isLoaded ?
                <>
                <section className='landing-section'>
                     <div className="letters">
                        <span className="letter">C</span>
                        <span className="letter">R</span>
                        <span className="letter">Y</span>
                        <span className="letter">S</span>
                        <span className="letter">T</span>
                        <span className="letter">A</span>
                        <span className="letter">L</span>
                        <span className="letter">{matches ? "" : <br></br> }</span>
                        <span className="letter">C</span>
                        <span className="letter">H</span>
                        <span className="letter">E</span>
                        <span className="letter">N</span>
                        <span className="letter">.</span>
                    </div>
                    <div className="job-title" >
                        <h2 dangerouslySetInnerHTML={{__html:restData.acf.job_title}}></h2>
                    </div>
                </section>
                <About restData={restData} />
                <Contact restData={restData} matches={matches}/>
                </>
            :
                <Loading />
            }
        </>
    )
}
export default PageHome