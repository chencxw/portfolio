import {useState, useEffect} from 'react';

function PageIndividualProject({restBase, handleDisplayLoadingGIF}) {
    const restPath = restBase + 'pages/6';
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
                    handleDisplayLoadingGIF();
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
            <section>
            </section>
            // <article>
            //     <div dangerouslySetInnerHTML={{__html:restData.acf.role_list}}>
            //     </div>
            // </article>
        }
    </>
  )
}

export default PageIndividualProject