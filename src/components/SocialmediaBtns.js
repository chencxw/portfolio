import {useState, useEffect} from 'react';
import { githubSVG, linkedinSVG, mailSVG } from '../globals/globals';

function SocialmediaBtns({restBase}) {
    const restPath = restBase + 'pages/6?acf_format=standard&test=test';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    // API call
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])

    return (
    <>  
        {isLoaded && 
            <>
            <a href={`${restData.acf.contact_email}`}>{mailSVG}</a>
            <a href={`${restData.acf.github_link}`}>{githubSVG}</a>
            <a href={`${restData.acf.linkedin_link}`}>{linkedinSVG}</a>
            </>
        }
    </>
    )
}
export default SocialmediaBtns