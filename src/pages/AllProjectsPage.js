import {useState, useEffect} from 'react';

function AllProjectsPage({restBase, handleDisplayLoading}) {
    const restPath = restBase + 'posts?_embed';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    // API call
    useEffect(() => {
        setTimeout(() => {
            const fetchData = async () => {
                const response = await fetch(restPath)
                if ( response.ok ) {
                    const data = await response.json()
                    setData(data)
                    setLoadStatus(true)
                    handleDisplayLoading();
                } else {
                    setLoadStatus(false)
                }
            }
            fetchData()
        }, 1040)

    }, [restPath])
    
    return (
        <div className='all-projects'>

        </div>
    )
}
export default AllProjectsPage