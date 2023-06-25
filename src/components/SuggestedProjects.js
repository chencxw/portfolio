import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import  {Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

function SuggestedProjects({restBase, featuredImage}) {
    const moreProjPath = restBase + 'posts?_embed&per_page=4&order=asc';
    const [moreProjData, setMoreProjData] = useState([]);
    const [isProjDataLoaded, setProjDataStatus] = useState(false);

    // API call
    useEffect(() => {
            const fetchData = async () => {
                const moreProjResponse = await fetch(moreProjPath)
                if ( moreProjResponse.ok ) {
                    const data_moreProj = await moreProjResponse.json()
                    setMoreProjData(data_moreProj)
                    setProjDataStatus(true)
                } else {
                    setProjDataStatus(false)
                }
            }
            fetchData()
    }, [moreProjPath])

    return (
        <>
            {isProjDataLoaded &&
                <Swiper 
                    modules={[Pagination]}
                    pagination={{clickable: true}}
                    slidesPerView={1} 
                    spaceBetween={20} 
                    centeredSlides={true} 
                    breakpoints={{
                        400:{
                            slidesPerView: "auto",
                            centeredSlides: false
                        }
                    }}
                >
                    {moreProjData.map(project => 
                        <SwiperSlide>
                            <Link to={`/${project.slug}`} key={project.id}>
                            <article id={`project-${project.id}`}>
                                { project.featured_media !== 0 && project._embedded['wp:featuredmedia'][0] &&
                                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                                }
                                <div className="project-titles">
                                    <h3 className='project-title'>{project.title.rendered}</h3>
                                    <h4 className='project-subtitle'>{project.acf.project_subtitle}</h4>
                                </div>
                            </article>
                            </Link>
                        </SwiperSlide>
                    )}
                </Swiper>
            }
        </>
    )
}
export default SuggestedProjects