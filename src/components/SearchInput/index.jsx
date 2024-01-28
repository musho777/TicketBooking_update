import './style.css'
import { Search, SearchCloseSvg } from '../svg'

export const SearchInput = ({ placeholder, close, changeValue, value }) => {
    return (
        <div onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
        }} className='inputWrapper' >
            <input value={value} id={value ? 'inputValue' : ''} className={'input'} placeholder={placeholder} onChange={(e) => changeValue(e.target.value)} />
            <div className='searchWrapper'>
                <Search />
            </div>
            <div className='searchCloseWrapper' onClick={() => close()}>
                <SearchCloseSvg />
            </div>
        </div>
    )
}