// import {useState, useEffect} from 'react';

function About({restData}) {

  return (
    <section className='about-section' id='about'>
        <h2>About.</h2>
        <div dangerouslySetInnerHTML={{__html:restData.acf.about_content}} className='about-content'></div>
        <section className='toolkit-section'>
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