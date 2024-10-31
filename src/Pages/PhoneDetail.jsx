import React ,{ useEffect , useState } from 'react'
import { Link , useLocation, useParams } from 'react-router-dom'
import { Container, Flex, Text, Skeleton,Box,Card, Avatar,Separator } from '@radix-ui/themes'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

export const PhoneDetail = () => {
    const { slug } = useParams()
    // const { state } = this.props.location
    // const { brand_slug, page } = useLocation()
    const { state } = useLocation()
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [images, setImages] = useState([])
    const [specs, setSpecs] = useState([])


    // console.log(props)
    // console.log(state)
    // console.log(brand_slug)
    useEffect(() => {
        const getDetail = async () => {
            setLoad(true)

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/${slug}`)
                const { data } = await res.json()
                setData(data)
                setSpecs(data.specifications)
                setImages(data.phone_images)
                // console.log(data)
                // console.log(images)
            } catch (error) {
                throw error
            } finally {
                setLoad(false)
            }
        }

        getDetail()
    },[slug])

  return (
    <>
        {load ? (
            <Container size="5">
                <Flex direction="column" gap="3">
                    <Text>
                        <Skeleton>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                            erat, fringilla sed commodo sed, aliquet nec magna.
                        </Skeleton>
                    </Text>

                    <Skeleton>
                        <Text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                            felis tellus, efficitur id convallis a, viverra eget libero. Nam magna
                            erat, fringilla sed commodo sed, aliquet nec magna.
                        </Text>
                    </Skeleton>
                </Flex>
            </Container>

        ) : (
            // <>
                <div className='flex flex-col items-start m-0 p-0 min-w-full'>
                    {state.brand_slug == null  ? (
                        <Link className='lg:flex-none hover:underline text-base text-pink-600 hover:text-pink-600' 
                            to={`/phone/${state.page}`}>Back</Link>
                    ) : (
                        <Link className='lg:flex-none hover:underline text-base text-pink-600 hover:text-pink-600' 
                            to={`/phone/${state.brand_slug}/${state.page}`}>Back</Link>
                    )}

                    <h1 className='font-bold text-lg text-gray-500'>{data.brand}</h1>
                    <h1 className='font-black text-2xl md:text-6xl text-white'>{data.phone_name}</h1>
                    <div className=''>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1}
                            style={{ backgroundColor: 'none' }}
                            className='swiper2 my-5 w-60 lg:w-72 mx-0'>
                                {images.map((data, index) => 
                            <SwiperSlide key={index}>
                                <img src={data}  className='m-2'/>

                            </SwiperSlide>
                                )} 
                        </Swiper>

                    </div>

                    <div className='flex flex-col items-start m-0 p-0'>
                        <p className="font-semibold text-base text-white">{data.release_date}</p>    
                        <p className="font-semibold text-base text-white">{data.dimension}</p>
                        <p className="font-semibold text-base text-white">{data.os}</p>
                        <p className="font-semibold text-base text-white">{data.storage}</p>
                    </div>

                    <div className='mt-5'>
                        {specs.map((data,index) =>
                        <div key={index}>
                            <Separator my="3" size="4" />
                            {/* <div className='divider'></div> */}
                            <div className='flex flex-wrap lg:flex-nowrap gap-5 '>
                                <p className='text-base font-bold'>{data.title}</p>
                                {data.specs.map((d, index) => 
                                <div key={index} className='flex flex-col text-start text-base items-start'>
                                    <p className='font-semibold text-white'>{d.key} </p>
                                    <p className='text-gray-300 '>{d.val} </p>
                                </div>
                                )}
                                
                            </div>
                        </div>
                        )}
                    </div>

                </div>
            // </>
        )} 
    </>
    // <div></div>
  )
}
