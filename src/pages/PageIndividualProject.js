import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { githubSVG, computerSVG } from '../globals/globals';
import "highlight.js/styles/base16/edge-light.css";
import hljs from "highlight.js";
import SuggestedProjects from '../components/SuggestedProjects';
import AOS from "aos";
import { Helmet } from 'react-helmet-async';

function PageIndividualProject({ restBase, handleDisplayLoadingGIF, featuredImage}) {
    const { slug } = useParams();
    const restPath = restBase + `posts?_embed&acf_format=standard&slug=${slug}`;
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

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

    // Run syntax highlighter
    useEffect(() => {
        hljs.highlightAll();
    })

    // Initialize AOS
    useEffect(() => {
        AOS.init();
    }, []);
    
    return (
        <>
            {isLoaded &&
                <>
                <Helmet>
                    <title>Crystal Chen | {restData.title.rendered}</title>
                    <meta name="description" content="Learn more about projects, including the planning and development stage, or view the live site and GitHub repo."/>
                </Helmet>
                <section className='project-landing-section' data-aos='fade-up'  data-aos-delay='300' data-aos-duration='1000'>
                    <div className="project-landing-content">
                        { restData.featured_media !== 0 && restData._embedded['wp:featuredmedia'][0] &&
                        <figure className="indvidual-proj-featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                        }
                        <div className="project-page-titles">
                            <h1>{restData.title.rendered}</h1>
                            <h2>{restData.acf.project_subtitle}</h2>
                        </div>
                    </div>
                </section>
                <section className='proj-summary-section'>
                    <div className="overview-wrapper">
                        <h3>Overview</h3>
                        <div className='proj-overview' dangerouslySetInnerHTML={{__html:restData.acf.overview_content}}></div>
                    </div>
                    <div className='proj-details'>
                        <h4>Toolkit</h4>
                        <p>{restData.acf.toolkit_list}</p>
                        <h4>Role</h4>
                        <p>{restData.acf.role_list}</p>
                        <h4>View Project</h4>
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