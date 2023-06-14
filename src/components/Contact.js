import {useState, useEffect} from 'react';
import { githubSVG, linkedinSVG } from "../globals/globals";

function Contact({restData}) {
    const [matchesQuery, setMatchesQuery] = useState(false);
    const [copyDisplayText, setCopyDisplayText] = useState("Copied to clipboard");
    const [showTooltip, setShowTooltip] = useState(false);

    // Media query
    function handleMediaChange(e) {
        setMatchesQuery(e.matches)
    }

    useEffect(() => {
        let mediaQuery = window.matchMedia('(min-width: 800px)');
        mediaQuery.addEventListener('change', handleMediaChange);
        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    })

    // Functions
    function handleCopyText() {
        navigator.clipboard.writeText('contact@crystalchen.ca');
        setShowTooltip(true);
    }

    function disableTooltip() {
        setShowTooltip(false);
    }

    return (
        <section className="contact-section" id="contact">
            <h2>Contact.</h2>
            <p className={matchesQuery ? "contact-content show" : "contact-content"}>{restData.acf.contact_content}</p>
            <span className="contact-underline"></span>
            <div className='tooltip'>
                <button className="contact-email" id="pulse-btn" onClick={handleCopyText} onMouseOut={disableTooltip}>
                    <span className={showTooltip ? "tooltipText show" : "tooltipText"}>{copyDisplayText}</span>
                    contact@crystalchen.ca
                </button>
            </div>
            <div className="socialmedia-icons">
                <a href={`${restData.acf.github_link}`} className="github-icon">{githubSVG}</a>
                <a href={`${restData.acf.linkedin_link}`} className="linkedin-icon" >{linkedinSVG}</a>
            </div>
        </section>
    )
}
export default Contact