import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AOS from "aos";

function ProjectGrid({data, featuredImage}) {
    const location = useLocation();

    // Initialize AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
        {data.map(project => 
            <Link to={`/${project.slug}`} key={project.id}  data-aos={location.pathname === "/all-projects" ? null : 'fade-up'} data-aos-duration='800'>
            <article id={`project-${project.id}`}>
                { project.featured_media !== 0 && project._embedded['wp:featuredmedia'][0] &&
                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                }
                <div className="project-titles">
                    <h3 className='project-title'>{project.title.rendered}</h3>
                    <h4 className='project-subtitle'>{project.acf.project_subtitle}</h4>
                    <div className='more-info-arrow'>
                        <span className='arrow-head'></span>
                    </div>
                </div>
            </article>
            </Link>
        )}
        </>
    )
}
export default ProjectGrid