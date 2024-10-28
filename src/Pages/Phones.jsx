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
                        <Link className='light:text-white lg:flex-none link-hover  hover:text-pink-600' to={'/'}>Back</Link>
                        <h1 className='font-bold text-white lg:flex-1 text-2xl lg:text-center'>
                            {data.title} 
                        </h1>
                    </div>
                    
                    <div className='flex flex-wrap md:justify-center gap-4 md:gap-3 lg:gap-14 lg:mx-4 mt-10'>
                        {phone.map((data,index) =>
                        // <Box maxWidth="240px"  key={index}>
                        <Box key={index}>
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
