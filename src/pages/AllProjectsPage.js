import {useState, useEffect, useContext} from 'react';
import ProjectGrid from '../components/ProjectGrid';

function AllProjectsPage({restBase, handleDisplayLoadingGIF, featuredImage}) {
    const restPathProj = restBase + 'posts?_embed&acf_format=standard&categories=3&order=asc';
    const [restDataProj, setDataProj] = useState([]);
    const [isLoadedProj, setProjLoadStatus] = useState(false);

    // API call
    useEffect(() => {
        handleDisplayLoadingGIF(true);
            const fetchData = async () => {
                const response_projects = await fetch(restPathProj)
                if ( response_projects.ok ) {
                    const dataProj = await response_projects.json()
                    setDataProj(dataProj)
                    setProjLoadStatus(true)
                    setTimeout(() => {
                        handleDisplayLoadingGIF(false);
                    }, 1000)
                } else {
                    setProjLoadStatus(false)
                }
            }
            fetchData()
    }, [restPathProj])
    
    
    return (
        <>
        {isLoadedProj && 
            <section className='all-projects project-grid'>
            <h2>All Projects.</h2>
            <ProjectGrid data={restDataProj} featuredImage={featuredImage}/>
            </section>
        }
        </>
    )
}
export default AllProjectsPage