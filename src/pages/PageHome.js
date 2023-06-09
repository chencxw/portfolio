import {useState, useEffect} from 'react';
import Loading from '../components/Loading';

function PageHome({restBase}) {
    const restPath = restBase + 'pages/6';
    const [restData, setData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);
    const [matches, setMatches] = useState(false);

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

    // Media query
    function checkDesktop(e) {
        setMatches(e.matches)
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 800px)');
        mediaQuery.addEventListener('change', checkDesktop);
        return () => mediaQuery.removeEventListener('change', checkDesktop);
      })

    return (
        <>
            <Loading />
        </>
    )
}
export default PageHome