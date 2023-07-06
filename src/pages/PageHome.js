import {useState, useEffect} from 'react';
import Loading from '../components/Loading';
import FeaturedProjects from '../components/FeaturedProjects';
import About from '../components/About';
import Contact from '../components/Contact';
import { Helmet } from 'react-helmet-async';
import "aos/dist/aos.css"

function PageHome({restBase, handleDisplayLoadingGIF, featuredImage}) {
    const restPath = restBase + 'pages/6?acf_format=standard';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [matches, setMatches] = useState(false);
    const [matchesDesktop, setMatchesDesktop] = useState(false);
    const query = "(min-width: 800px)";
    const query2 = "(min-width: 1024px)";

    // API call
    useEffect(() => {
        handleDisplayLoadingGIF(false);
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setTimeout(() => {
                    setLoadStatus(true)
                }, 500);
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()

    }, [restPath])

    // Media queries
    function checkTablet(e) {
        setMatches(e.matches)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);
        mediaQuery.addEventListener('change', checkTablet);
        return () => mediaQuery.removeEventListener('change', checkTablet);
    })

    function checkDesktop(e) {
        setMatchesDesktop(e.matches)
    }

    useEffect(() => {
        const mediaQuery2 = window.matchMedia(query2);
        setMatchesDesktop(mediaQuery2.matches);
        mediaQuery2.addEventListener('change', checkDesktop);
        return () => mediaQuery2.removeEventListener('change', checkDesktop);
    })

    return (
        <>
            <Helmet>
                <title>Crystal Chen's Portfolio | Junior Front-End Web Developer</title>
                <meta name="description" content="Crystal Chen - Junior Front End Web Developer located in Vancouver. Explore Crystal's portfolio showcasing her passion for creating captivating web experiences."/>
            </Helmet>
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
                        <h1 className='sr-only'>Crystal Chen</h1>
                    </div>
                    <div className="job-title" >
                        <p dangerouslySetInnerHTML={{__html:restData.acf.job_title}}></p>
                    </div>
                </section>
                <FeaturedProjects restBase={restBase} featuredImage={featuredImage} matches={matches}/>
                <About restData={restData} />
                <Contact restData={restData} matchesDesktop={matchesDesktop}/>
                </>
            :
                <Loading />
            }
        </>
    )
}
export default PageHome