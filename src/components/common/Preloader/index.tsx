import React from 'react'
import preloader from '../../../assets/images/preloader.svg'
import preloaderMini from '../../../assets/images/preloaderMini.svg'

let Preloader: React.FC = () => {
    return <span className="preloader">
        <img src={window.matchMedia('(min-width: 600px)').matches ? preloader : preloaderMini} alt={''}/>
    </span>
}

export default Preloader
