import {useState, useEffect, useContext} from 'react';
import ProjectGrid from '../components/ProjectGrid';

function AllProjectsPage({restBase, handleDisplayLoadingGIF, featuredImage}) {
    const restPathProj = restBase + 'posts?_embed&categories=3&order=asc&';
    const restPathPersonalProj = restBase + 'posts?_embed&categories=5';
    const [restDataProj, setDataProj] = useState([]);
    const [restDataPersonalProj, setDataPersonalProj] = useState([]);
    const [isLoadedProj, setProjLoadStatus] = useState(false);
    const [isLoadedPersonalProj, setPersonalProjLoadStatus] = useState(false);

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
                    setPersonalProjLoadStatus(true)
                    setTimeout(() => {
                        handleDisplayLoadingGIF(false);
                    }, 1000)
                } else {
                    setProjLoadStatus(false)
                    setPersonalProjLoadStatus(false)
                }
            }
            fetchData()
    }, [restPathProj, restPathPersonalProj])
    
    
    return (
        <>
        {isLoadedProj && isLoadedPersonalProj &&
            <section className='all-projects project-grid'>
            <h2>All Projects.</h2>
            <ProjectGrid data={restDataProj} featuredImage={featuredImage}/>
            <ProjectGrid data={restDataPersonalProj} featuredImage={featuredImage}/>
            </section>
        }
        </>
    )
}
export default AllProjectsPage