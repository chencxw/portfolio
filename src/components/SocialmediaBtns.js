import {useState, useEffect, useContext} from 'react';
import { githubSVG, linkedinSVG, mailSVG } from '../globals/globals';
import { RestBaseContext } from '../App';

function SocialmediaBtns() {
    const restBase = useContext(RestBaseContext);
    const restPath = restBase + 'pages/6?acf_format=standard&test=test';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

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

    // Function to copy email
    function handleCopyText() {
        navigator.clipboard.writeText(restData.acf.contact_email);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 800)
    }

    return (
    <>  
        {isLoaded && 
            <>
            <button className='email-btn tooltip' onClick={handleCopyText}>
                <span className={showMessage ? "tooltipText show" : "tooltipText"}>Copied!</span>
                {mailSVG}
                <span className='sr-only'>Copy Email</span>
            </button>
            <a href={`${restData.acf.github_link}`}>{githubSVG}</a>
            <a href={`${restData.acf.linkedin_link}`}>{linkedinSVG}</a>
            </>
        }
    </>
    )
}
export default SocialmediaBtns