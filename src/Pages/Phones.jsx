import React ,{ useEffect , useState } from 'react'
import { Link , useParams } from 'react-router-dom'
import { Container, Flex, Text, Skeleton,Box,Card, Avatar } from '@radix-ui/themes'

export const Phones = () => {
    const { slug,page } = useParams()
    const [phone, setPhone] = useState([])
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const getPhones = async () => {
            setLoad(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/brands/${slug}?page=${page}`)
                const { data } = await res.json()
                // console.table(data)
                setData(data)
                setPhone(data.phones)
            } catch (error) {
                throw error
            } finally {
                setLoad(false)
            }
        }
    
        getPhones()
    }, [slug,page])
    

    return (
        <>
            {load ? (
                <>
                    <Container size="1">
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
                </>
            ) : (
                <>
                    <div className='m-7 md:m-14 lg:m-4 lg:flex'>
                        <Link className='light:text-white lg:flex-none link-hover  hover:text-pink-600' to={'/'}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </Link>
                        <h1 className='font-bold text-white lg:flex-1 text-2xl lg:text-center'>
                            {data.title} 
                        </h1>
                    </div>
                    
                    <div className='flex flex-wrap md:justify-center gap-4 md:gap-3 lg:gap-14 lg:mx-4 mt-10'>
                        {phone.map((data,index) =>
                        // <Box maxWidth="240px"  key={index}>
                        // <Link key={index} to={{ 
                        //     pathname: `/phone/${data.slug}/detail`,
                        //     state: {
                        //         'brand-slug' : slug,
                        //         'page' : page,
                        //     }
                        // }}>
                        <Link key={index} to={`/phone/${data.slug}/detail`} 
                            state={{ brand_slug: slug, page: page }}>
                            <Box>
                                <Card className='hover:scale-105 duration-300 w-[160px] h-[100px] md:w-[200px] md:h-[150px]'>
                                    <Flex gap="3" className='w-full h-full' align="center">
                                        <Avatar
                                            size="5"
                                            src={data.image}
                                            radius="none"
                                            fallback="T"
                                        />
                                        <Box>
                                            <Text as="div" size="2" weight="bold">
                                                {data.phone_name}
                                            </Text>
                                            <Text as="div" size="2" color="gray">
                                                {data.brand}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Card>
                            </Box>
                        </Link>
                            // <Card key={index} image={data.image} name={data.phone_name} brand={data.brand} slug={data.slug} />
                        )}
                    </div>
                    
                    <div className='flex justify-between m-4'>
                        {data.current_page <= data.last_page && data.current_page > 1 &&
                            <Link to={`/phone/${slug}/${parseInt(page)-1}`}>
                                <button className='btn btn-ghost hover:bg-pink-600'>Previous</button>
                            </Link>
                        }

                        {data.current_page < data.last_page &&
                            <Link to={`/phone/${slug}/${parseInt(page)+1}`}>
                                <button className='btn btn-ghost'>Next</button>
                            </Link>
                        }
                    </div>  
                    {/* <h1>askdjkajdsasd</h1> */}
                </>
            )}
        </>
    )
}
