import logo from '../images/logo.png';
import Payment from '../components/Payment';

const PageHeader = () => {
    return (
        <>
        <header>
            <div id="top-bar">
                <button Login >Login</button>
            </div>
            <div id="main-header" className="flex-row">
                <div id="page-logo"> 
                <img src={logo} width="70vw" height="70vh"></img>
                </div>
            <nav id="nav-bar">Nav bar</nav>
            <Payment/>
            
            </div>
        </header>
        </>

    )
}

export default PageHeader;