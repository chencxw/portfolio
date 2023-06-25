import {useState, useEffect} from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { githubSVG, computerSVG, arrowR } from '../globals/globals';
import "highlight.js/styles/base16/edge-light.css";
import hljs from "highlight.js";
import SuggestedProjects from '../components/SuggestedProjects';

function PageIndividualProject({restBase, handleDisplayLoadingGIF, featuredImage}) {
    const { slug } = useParams();
    const restPath = restBase + `posts?_embed&acf_format=standard&slug=${slug}`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const navigate = useNavigate();

    // API call
    useEffect(() => {
        handleDisplayLoadingGIF(true);
            const fetchData = async () => {
                const response = await fetch(restPath)
                if ( response.ok ) {
                    const data = await response.json()
                    setData(data[0])
                    setLoadStatus(true)
                    setTimeout(() => {
                        handleDisplayLoadingGIF(false);
                    }, 1000)
                } else {
                    setLoadStatus(false)
                }
            }
            fetchData()
    }, [restPath])

    // Create img tag with proper srcset and sizes
    const imageGallery = ( imageObject ) => {
        let imgWidth = imageObject.media_details.sizes.full.width;
        let imgHeight = imageObject.media_details.sizes.full.height;
        let imgURL = imageObject.source_url;
        let img = `<img src="${imgURL}" 
            alt="${imageObject.alt_text}"
            srcset="${imgURL} ${imgWidth}w,
            ${imageObject.media_details.sizes.large ? imageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
            ${imageObject.media_details.sizes.medium_large ? imageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
            ${imageObject.media_details.sizes.medium ? imageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
            sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
        return {__html: img}
    }

    // Function to go back
    const goBack = () => {
        navigate(-1);
    }

    // Run syntax highlighter
    useEffect(() => {
        hljs.highlightAll();
    })
    
    return (
        <>
            {isLoaded &&
                <>
                <section className='project-landing-section'>
                    <button className='back-link' onClick={goBack} >{arrowR} Back</button>
                    <div className="project-landing-content">
                        { restData.featured_media !== 0 && restData._embedded['wp:featuredmedia'][0] &&
                        <figure className="indvidual-proj-featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        <div className="project-page-titles">
                            <h2>{restData.title.rendered}</h2>
                            <h3>{restData.acf.project_subtitle}</h3>
                        </div>
                    </div>
                </section>
                <section className='proj-summary-section'>
                    <div className="overview-wrapper">
                        <h4>Overview</h4>
                        <div className='proj-overview' dangerouslySetInnerHTML={{__html:restData.acf.overview_content}}></div>
                    </div>
                    <div className='proj-details'>
                        <h5>Toolkit</h5>
                        <p>{restData.acf.toolkit_list}</p>
                        <h5>Role</h5>
                        <p>{restData.acf.role_list}</p>
                        <h5>View Project</h5>
                        <div className='view-project-links'>
                            <a href={`${restData.acf.live_site_link}`}>{computerSVG} Live Site</a>
                            <a href={`${restData.acf.github_repo_link}`}>{githubSVG} GitHub Repository</a>
                        </div>
                    </div>
                </section>
                <section className='project-gallery'>
                    {restData._embedded['acf:attachment'] &&
                        restData._embedded['acf:attachment'].map(object => 
                            <figure dangerouslySetInnerHTML={imageGallery(object)} key={object.id}></figure>
                    )}
                </section>
                <section className='project-accordion'>
                        <div dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                        </div>
                </section>
                <section className="suggested-projects">
                    <h4 className='title'>More Projects</h4>
                    <SuggestedProjects restBase={restBase} featuredImage={featuredImage} />
                </section>
                </>
            }
        </>
    )
}

export default PageIndividualProject