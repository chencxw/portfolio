import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { arrowR, lineArrowR } from '../globals/globals';



function FeaturedProjects({restBase, featuredImage}) {
    const restPathProjects = restBase + 'posts?_embed&tags=4';
    const [restDataProjects, setDataProjects] = useState([]);
    const [isLoadedProjects, setProjectLoadStatus] = useState(false);

  // API call
    useEffect(() => {
    const fetchData = async () => {
        const response_projects = await fetch(restPathProjects)
        if ( response_projects.ok ) {
            const restDataProjects = await response_projects.json()
            setDataProjects(restDataProjects)
            setProjectLoadStatus(true)
        } else {
            setProjectLoadStatus(false)
        }
    }
    fetchData()
    }, [restPathProjects])

    return (   
    <>
    { isLoadedProjects && 
        <section className='featured-projects'>
            <h2>Projects.</h2>
            {restDataProjects.map(project => 
            <article key={project.id} id={`feature-project-${project.id}`}>
                { project.featured_media !== 0 && project._embedded['wp:featuredmedia'][0] &&
                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                }
                <div className="project-titles">
                    <h3 className='project-title'>{project.title.rendered}</h3>
                    <h4 className='project-subtitle'>{project.acf.project_subtitle}</h4>
                    <div className='more-info-arrow'>{lineArrowR}</div>
                </div>
            </article>
            )}
            <Link to={'/all-projects'} className='all-projects-link'>See All Projects<span className='arrow-span'>{arrowR}</span></Link>
        </section>
    }
    </>
    )
}
export default FeaturedProjects