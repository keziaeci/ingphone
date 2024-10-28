import React ,{ useEffect , useState } from 'react'
import { Link , useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { TabNav } from '@radix-ui/themes'

import 'swiper/css';
import 'swiper/css/effect-cards';
import '../assets/style/style.css'

export const Home = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const getBrand = async () => {
            setLoad(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/brands`)
                const {data} = await res.json()
                setData(data)
            } catch (error) {
                throw error
            } finally {
                setLoad(false)
            }
        }

        getBrand()
    },[])

    return (
        <>
            {load ? (
                <>
                    <Navbar/>
                    <div className='mt-10 lg:mt-40 flex items-center justify-center'>
                            <p>wait a dang minute</p>
                    </div>
                </>
            ) : (
                <>
                    <Navbar/>

                    <div className='mt-10 lg:mt-40 flex items-center'>
                        <Swiper effect={'cards'} grabCursor={true} modules={[EffectCards]} className="mySwiper">
                            {data.map((data) =>
                                <SwiperSlide key={data.brand_id}>
                                    <Link  to={`/phone/${data.brand_slug}/${1}`} className='link-hover'>
                                        <h1>
                                            {data.brand_name} 
                                        </h1>
                                    </Link> 
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </div>

                    <div className='flex flex-wrap justify-center gap-2 lg:mx-4 my-2'>
                    </div>  
                </>
            ) }
        </>
    )
}


export const Navbar = () => {
    return (

        <TabNav.Root>
            <TabNav.Link href="#" active>
                Account
            </TabNav.Link>
            <TabNav.Link href="#">Documents</TabNav.Link>
            <TabNav.Link href="#">Settings</TabNav.Link>
        </TabNav.Root>

        // <div className="flex">
        //     <div className="flex-none lg:flex-1">
        //         <a className="light:text-white btn btn-ghost normal-case text-xl">ingfoHP</a>
        //     </div>
        //     <div className="flex-wrap lg:flex-none gap-5">
        //         <ul className="invisible lg:visible menu menu-horizontal px-1">
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/latest'}>Latest Released</Link>
        //             </li>
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/fans'}>Top by fans</Link>
        //             </li>
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/interest'}>Top by interest</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
        // <div className="navbar bg-transparent p-8">
        //     <div className="flex-none lg:flex-1">
        //         <a className="light:text-white btn btn-ghost normal-case text-xl">ingfoHP</a>
        //     </div>
        //     <div className="flex-wrap lg:flex-none gap-5">
        //         <ul className="invisible lg:visible menu menu-horizontal px-1">
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/latest'}>Latest Released</Link>
        //             </li>
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/fans'}>Top by fans</Link>
        //             </li>
        //             <li>
        //                 <Link className='link-hover font-semibold text-pink-600 hover:text-pink-700' to={'/phone/interest'}>Top by interest</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    )
}
