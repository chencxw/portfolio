import { Link } from 'react-router-dom';

function ProjectGrid({data, featuredImage}) {

    return (
        <>
        {data.map(project => 
            <Link to={`/${project.slug}`}>
            <article key={project.id} id={`project-${project.id}`}>
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