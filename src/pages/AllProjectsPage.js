import {useState, useEffect } from 'react';
import ProjectGrid from '../components/ProjectGrid';
import { Helmet } from 'react-helmet-async';

function AllProjectsPage({restBase, handleDisplayLoadingGIF, featuredImage}) {
    const restPathProj = restBase + 'posts?_embed&categories=3&order=asc';
    const restPathPersonalProj = restBase + 'posts?_embed&categories=5';
    const [restDataProj, setDataProj] = useState([]);
    const [restDataPersonalProj, setDataPersonalProj] = useState([]);
    const [isLoadedProj, setProjLoadStatus] = useState(false);

    // API call
    useEffect(() => {
        handleDisplayLoadingGIF(true);
            const fetchData = async () => {
                const response_projects = await fetch(restPathProj)
                const response_personalProj = await fetch(restPathPersonalProj)
                if ( response_projects.ok && response_personalProj.ok) {
                    const dataProj = await response_projects.json()
                    const dataPersonalProj = await response_personalProj.json()
                    setDataProj(dataProj)
                    setDataPersonalProj(dataPersonalProj)
                    setProjLoadStatus(true)
                    setTimeout(() => {
                        handleDisplayLoadingGIF(false);
                    }, 1000)
                } else {
                    setProjLoadStatus(false)
                }
            }
            fetchData()
    }, [restPathProj, restPathPersonalProj])

    return (
        <>
        <Helmet>
            <title>Crystal Chen | All Projects</title>
            <meta name="description" content="Websites and projects created by Crystal Chen. Explore WooCommerce stores, react-apps, and more."/>
        </Helmet>
        {isLoadedProj && 
            <section className='all-projects'>
            <h2>All Projects.</h2>
            <div className='all-projects-grid project-grid' data-aos='fade-up' data-aos-duration='1000' data-aos-delay='200'>
                <ProjectGrid data={restDataProj} featuredImage={featuredImage}/>
                <ProjectGrid data={restDataPersonalProj} featuredImage={featuredImage}/>
            </div>
            </section>
        }
        </>
    )
}
export default AllProjectsPage