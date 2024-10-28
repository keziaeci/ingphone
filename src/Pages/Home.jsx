import React ,{ useEffect , useState } from 'react'
import { Link , useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

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
            
        </>
    )
}
