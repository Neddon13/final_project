const Payment = () => {

    const openStripe = () => {
        window.open('https://buy.stripe.com/test_fZeeWybyI4oX9Gw9AA')
    }

    return(
        <>
        <div id="checkout-button">
            <input type="button" value="Subscription" onClick= {openStripe}/>
            </div>
        </>
    )
}

export default Payment;