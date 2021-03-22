import React from 'react'
import preloader from '../../../assets/images/preloader.svg'
import preloaderMini from '../../../assets/images/preloaderMini.svg'

const Preloader: React.FC = () => (
  <span className="preloader">
    <img src={window.matchMedia('(min-width: 600px)').matches ? preloader : preloaderMini} alt="" />
  </span>
)

export default Preloader
