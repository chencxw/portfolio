import {useState, useEffect} from 'react';

function PageHome({restBase}) {
    const restPath = restBase + 'pages/6'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

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
        <div>
            {/* {isLoaded && 
                <article>
                    <div dangerouslySetInnerHTML={{__html:restData.acf.role_list}}>
                    </div>
                </article>
            } */}

        </div>
    )
}
export default PageHome