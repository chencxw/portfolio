import {useEffect} from 'react';
import AOS from "aos";

function About({restData}) {
    // Initialize AOS
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className='about-section' id='about'>
            <h2 data-aos='fade-right' data-aos-duration='800'>About.</h2>
            <div data-aos='fade-up' data-aos-duration='800' dangerouslySetInnerHTML={{__html:restData.acf.about_content}} className='about-content'></div>
            <section data-aos='fade-right' data-aos-duration='800' className='toolkit-section'>
                <h3>Toolkit</h3>
                <h4>Development</h4>
                <p>{restData.acf.toolkit_list}</p>
                <h4>Design</h4>
                <p>{restData.acf.toolkit_list_2}</p>
            </section>
        </section>
    )
}
export default About