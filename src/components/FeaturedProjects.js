import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { arrowR } from '../globals/globals';
import ProjectGrid from './ProjectGrid';

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
        <section className='featured-projects project-grid'>
            <h2>Projects.</h2>
            <ProjectGrid data={restDataProjects} featuredImage={featuredImage}/>
            <Link to={'/all-projects'} className='all-projects-link'>See All Projects<span className='arrow-span'>{arrowR}</span></Link>
        </section>
    }
    </>
    )
}
export default FeaturedProjects