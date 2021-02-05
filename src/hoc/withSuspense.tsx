import React from 'react'
import Preloader from '../components/common/Preloader'

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {  //Ленивая загрузка компонента
    return (props: WCP) => {
        return <React.Suspense fallback={<Preloader/>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    }

}
