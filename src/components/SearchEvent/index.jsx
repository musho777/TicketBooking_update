import './style.css'

export const SearchEvent = ({ data }) => {
    if (data[0]?.image) {
        return (
            <div className='SearchEventDiv'>
                <div className='searchEvent'>
                    <img alt='' src={`${process.env.REACT_APP_IMAGE}/${data[0]?.image}`} />
                    <p>{data[0]?.text}</p>
                </div>
                <div className='searchEvent'>
                    <img alt='' src={`${process.env.REACT_APP_IMAGE}/${data[0]?.image}`} />
                    <p>{data[0]?.text}</p>
                </div>
            </div>
        )
    }
}