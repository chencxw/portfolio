import { githubSVG, linkedinSVG } from "../globals/globals";

function Contact({restData}) {
  return (
    <section className="contact-section" id="contact">
        <h2>Contact.</h2>
        <p className="contact-content show">{restData.acf.contact_content}</p>
        <span className="contact-underline"></span>
        <a href={`mailto:${restData.acf.contact_email}`} className="contact-email" ><p>contact@crystalchen.ca</p></a>
        <div className="socialmedia-icons">
            <a href={`${restData.acf.github_link}`} className="github-icon">{githubSVG}</a>
            <a href={`${restData.acf.linkedin_link}`} className="linkedin-icon" >{linkedinSVG}</a>
        </div>
    </section>
  )
}
export default Contact