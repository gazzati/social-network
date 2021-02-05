import React from 'react'
import Particles from 'react-particles-js'

import s from './style.module.css'

const BackgroundEffect: React.FC = () => {
    const color = document.documentElement.getAttribute('data-theme') === 'dark' ? '#242630' : '#1a122d'
    return (
        <Particles
            className={s.bg}
            params={{
                particles: {
                    color: {
                        value: color,
                    },
                    opacity: {
                      value: 1
                    },
                    number: {
                        value: 170
                    },
                    size: {
                        value: 5,
                        random: true,
                        anim: {
                            speed: 4,
                            size_min: 0.3
                        }
                    },
                    line_linked: {
                        enable: false
                    },
                    move: {
                        random: true,
                        speed: 1,
                        direction: 'top',
                        out_mode: 'out'
                    }
                },
                interactivity: {
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'attract'
                        },
                        onclick: {
                            enable: true,
                            mode: 'repulse'
                        }
                    },
                    modes: {
                        repulse: {
                            distance: 400,
                            duration: 8
                        }
                    }
                }
            }}
        />
    )
}

export default BackgroundEffect
