import Payment from '../components/Payment';

const PageHeader = () => {
    return (
        <>
        <header>
            <div id="main-header" className="flex-row">
                <div id="page-logo"> 
                <h1>Game World</h1>
                </div>
                <hr></hr>
            <Payment/>
            </div>
        </header>
        </>

    )
}

export default PageHeader;