import SocialmediaBtns from './SocialmediaBtns';

function Sidebar({restBase}) {

    return (
        <>
            <nav className='sidebar'>
                <div className='sidebar-line'></div>
                <SocialmediaBtns restBase={restBase}/>
            </nav>
        </>
    )
}
export default Sidebar