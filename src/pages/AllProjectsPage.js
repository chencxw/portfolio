import {useState, useEffect, useContext} from 'react';

function AllProjectsPage({restBase, handleDisplayLoadingGIF}) {
    const restPath = restBase + 'posts?_embed';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    // API call
    useEffect(() => {
        handleDisplayLoadingGIF(true);
        setTimeout(() => {
            const fetchData = async () => {
                const response = await fetch(restPath)
                if ( response.ok ) {
                    const data = await response.json()
                    setData(data)
                    setLoadStatus(true)
                    handleDisplayLoadingGIF(false);
                } else {
                    setLoadStatus(false)
                }
            }
            fetchData()
        }, 1040)
    }, [restPath])
    
    
    return (
        <>
        {isLoaded && 
            <div className='all-projects'>

            </div>
        }
        </>
    )
}
export default AllProjectsPage