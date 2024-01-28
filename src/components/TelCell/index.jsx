import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CryptoJS from 'crypto-js'
import { Buffer } from "buffer"

export const TelCell = () => {
    const [price, setPrice] = useState()
    const params = useParams()
    const issuerId = params.issuerId

    useEffect(() => {
        if (price) {
            const popup = window.open('https://shinetickets.com');
            document.getElementById('form').submit()
            if (!popup || popup.closed || typeof popup.closed === 'undefined') {
                alert('Pop-up blocked. Please enable pop-ups for this site.');
            }
            else {
                window.location = '/'
            }
        }

        setPrice(params.price)
    }, [price])

    const encodedProduct = new Buffer.from('Ticket111').toString('base64')
    const encodedIssuerId = new Buffer.from(issuerId).toString('base64')
    const security_code = getTelcellSecurityCode(
        process.env.REACT_APP_TELCELL_SHOP_KEY,
        process.env.REACT_APP_TELCELL_ISSUER,
        "֏",
        price,
        encodedProduct,
        encodedIssuerId,
        "1"
    )

    function getTelcellSecurityCode(shop_key, issuer, currency, price, product, issuer_id, valid_days) {
        return CryptoJS.MD5(shop_key + issuer + currency + price + product + issuer_id + valid_days).toString();
    }

    return (
        <form id='form' style={{ margin: "20px" }} target="_blank" action="https://telcellmoney.am/invoices" method="POST" >
            <input type="hidden" name="action" value="PostInvoice" />
            <input type="hidden" name="issuer" value={process.env.REACT_APP_TELCELL_ISSUER} />
            <input type="hidden" name="currency" value="֏" />
            <input type="hidden" name="price" value={price} />
            <input type="hidden" name="product" value={encodedProduct} />
            <input type="hidden" name="issuer_id" value={encodedIssuerId} />
            <input type="hidden" name="valid_days" value="1" />
            <input type="hidden" name="lang" value="am" />
            <input type="hidden" name="security_code" value={security_code} />
            <button type="submit">Оплатить</button>
        </form>
    )
}