import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { githubSVG, computerSVG } from '../globals/globals';

function PageIndividualProject({restBase, handleDisplayLoadingGIF, featuredImage}) {
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
    
    return (
        <>
            {isLoaded &&
                <>
                <section className='project-landing-section'>
                    <h2>{restData.title.rendered}</h2>
                    <h3>{restData.acf.project_subtitle}</h3>
                    { restData.featured_media !== 0 && restData._embedded['wp:featuredmedia'][0] &&
                    <figure className="indvidual-proj-featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                }
                </section>
                <section>
                    <h4>Overview</h4>
                    <div className='proj-overview' dangerouslySetInnerHTML={{__html:restData.acf.overview_content}}></div>
                    <div className='proj-details'>
                        <h5>Toolkit</h5>
                        {restData.acf.toolkit_list}
                        <h5>Role</h5>
                        {restData.acf.role_list}
                        <h5>View Project</h5>
                        <div className='view-project-links'>
                            <a href={`${restData.acf.live_site_link}`}>{computerSVG} Live Site</a>
                            <a href={`${restData.acf.github_repo_link}`}>{githubSVG} GitHub Repository</a>
                        </div>
                    </div>
                </section>
                <section className='project-gallery'>
                    {restData._embedded['acf:attachment'].map(object => 
                        <figure className='gallery-img-container' dangerouslySetInnerHTML={featuredImage(object)}></figure>
                    )}

                </section>
                <section className='project-accordion'>
                    <div dangerouslySetInnerHTML={{__html:restData.content.rendered}}>
                    </div>
                </section>
                </>
            }
        </>
    )
}

export default PageIndividualProject