import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { arrowR } from '../globals/globals';
import ProjectGrid from './ProjectGrid';
import AOS from "aos";

function FeaturedProjects({restBase, featuredImage, matches}) {
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

    // Initialize AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return (   
    <>
    { isLoadedProjects && 
        <section className='featured-projects project-grid'>
            <h2 data-aos='fade-right' data-aos-duration='800'>Projects.</h2>
            <ProjectGrid data={restDataProjects} featuredImage={featuredImage}/>
            <div className='projects-link-wrapper' data-aos={matches ? 'fade-right' : null } data-aos-duration='800' data-aos-delay='300'>
                <Link to={'/all-projects'} className='all-projects-link'>
                    See All Projects<span className='arrow-span'>{arrowR}</span>
                </Link>
            </div>
        </section>
    }
    </>
    )
}
export default FeaturedProjects