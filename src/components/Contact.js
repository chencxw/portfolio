import {useState, useEffect, useRef} from 'react';
import { githubSVG, linkedinSVG } from '../globals/globals';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

function Contact({restData, matchesDesktop}) {
    const [copyDisplayText, setCopyDisplayText] = useState("Copy to clipboard");
    const [showTooltip, setShowTooltip] = useState(false);
    const pulseBtnRef = useRef(null);
    const contactUL = useRef(null)

    // Functions
    function handleCopyText() {
        navigator.clipboard.writeText(restData.acf.contact_email);
        setShowTooltip(true);
        setTimeout(() => {
            setShowTooltip(false);
        }, 800)
    }

    function handleCopyTextDesktop() {
        navigator.clipboard.writeText(restData.acf.contact_email);
        setCopyDisplayText("Copied!");
        setShowTooltip(true);
    }

    function disableTooltip() {
        setShowTooltip(false);
        setCopyDisplayText("Copy to clipboard");
    }

    // For GSAP animation
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const buttonElement = pulseBtnRef.current;
        const underlineElement = contactUL.current;
        let contactTL = gsap.timeline({ defaults: {duration: 0.15} });

        ScrollTrigger.create({
            animation: contactTL,
            trigger: buttonElement,
            markers: true
        })

        // ScrollTrigger.refresh(true);

        if(matchesDesktop === true) {
            contactTL.fromTo(underlineElement, {width: 0}, {width: 200, duration: 0.7, delay: 0.4});
        }else {
            contactTL.fromTo(underlineElement, {width: 0}, {width: 100, duration: 0.7, delay: 0.4});
        }
        contactTL.to(buttonElement, {scale: 1.08, delay: 0.2});
        contactTL.to(buttonElement, {rotate: -3});
        contactTL.to(buttonElement, {rotate: 3});
        contactTL.to(buttonElement, {rotate: -3});
        contactTL.to(buttonElement, {rotate: 0});
        contactTL.to(buttonElement, {scale: 1});
    }, [matchesDesktop])

    useEffect(() => {
        ScrollTrigger.refresh(true);
    })

    return (
        <section className="contact-section" id="contact">
            <h2>Contact.</h2>
            <p className={matchesDesktop ? "contact-content show" : "contact-content"}>{restData.acf.contact_content}</p>
            <span className="contact-underline" ref={contactUL}></span>
            <div className='tooltip'>
                <button 
                    ref={pulseBtnRef} 
                    className="contact-email" 
                    id="pulse-btn" 
                    onClick={matchesDesktop ? handleCopyTextDesktop : handleCopyText} 
                    onMouseOut={matchesDesktop ? disableTooltip : null} 
                >
                    <span className={showTooltip ? "tooltipText show" : "tooltipText"}>{matchesDesktop ? copyDisplayText : "Copied!"}</span>
                    {restData.acf.contact_email}
                    <span className='sr-only'>Copy Email</span>
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