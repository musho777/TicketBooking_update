import { useEffect, useState } from 'react'
import './styles.css'
export const CategoryType = ({ type, name }) => {
    const [color, setColoer] = useState('#4DCF5F')
    useEffect(() => {
        if (type === "65722b047d066ae13510acd7") {
            setColoer('#FF6969')
        }
        else if (type === "657b00c67a91070546630967") {
            setColoer('#D943FF')
        }
        else if (type === "6581e2425bf51638abd3f9ee") {
            setColoer('#11AEF4')
        }
        else if (type === "6581e28f5bf51638abd3fa02") {
            setColoer('#FFCE00')
        }
        else if (type === "6581e26c5bf51638abd3f9f8") {
            setColoer('#4DCF5F')
        }
    }, [type])
    return <div style={{ backgroundColor: color }} className="CategoryType">
        <p>{name}</p>
    </div>
}