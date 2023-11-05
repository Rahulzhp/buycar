import { Box, Button, Heading, SimpleGrid, useToast, Wrap, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios";
import { useEffect } from 'react';

const Budget = () => {
    const toast = useToast();
    const [data, setData] = useState([]);
    const [activeRange, setActiveRange] = useState(null);
    const [activeSpeedRange, setActiveSpeedRange] = useState(null);

    useEffect(() => {
        filterByBudget(0, 500000);
    }, []);
    const CarToken = (localStorage.getItem("Cartoken"))
    const filterByBudget = (minPrice, maxPrice) => {
        axios
            .get(`http://localhost:8080/cars/?minPrice=${minPrice}&maxPrice=${maxPrice}`, {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2ODI3ZmI2YTU3OTFiZjQ1ZmQzOTgiLCJpYXQiOjE2OTkxMTk3NTUsImV4cCI6MTY5OTEyMzM1NX0.d4hi-hduHx7ek1fPL_yu0Ovt2JFSh7RPjwn7X30988U',
                },
            })
            .then((res) => {
                setData(res.data.data);
                setActiveRange(`${minPrice}-${maxPrice}`);
                setActiveSpeedRange(null);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const filterBySpeed = (minSpeed, maxSpeed, range) => {
        axios
            .get(`http://localhost:8080/cars/speed/${range}`, {
                headers: {
                    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2ODI3ZmI2YTU3OTFiZjQ1ZmQzOTgiLCJpYXQiOjE2OTkxMTk3NTUsImV4cCI6MTY5OTEyMzM1NX0.d4hi-hduHx7ek1fPL_yu0Ovt2JFSh7RPjwn7X30988U',
                },
            })
            .then((res) => {
                setData(res.data);
                setActiveSpeedRange(range);
                setActiveRange(null); // Clear active budget range
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleCart = () => {
        if (CarToken) {

        } else {
            toast({
                title: "Error",
                description: "Please Login First",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <div>
            <Box>
                <Box margin="31px 2px 5px 65px" alignItems="flex-start" fontFamily="LatoGoogle, Lato, LatoWeb, sans-serif" color="#484848" fontWeight="semibold" fontSize="17px">
                    <Heading fontSize="21px">Find The Cars Of Your Choice</Heading>
                </Box>
                <Box width="90%" margin="auto" height="59px" backgroundColor="gray" display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                        borderRadius="30px"
                        onClick={() => filterByBudget(0, 500000)}
                        style={{
                            backgroundColor: activeRange === '0-500000' ? '#6599d4' : '#D3D3D3',
                            color: activeRange === '0-500000' ? 'white' : 'black',
                        }}
                    >
                        Under 5 Lakh
                    </Button>
                    <Button
                        borderRadius="30px"
                        onClick={() => filterByBudget(500001, 1000000)}
                        style={{
                            backgroundColor: activeRange === '500001-1000000' ? '#6599d4' : '#D3D3D3',
                            color: activeRange === '500001-1000000' ? 'white' : 'black',
                        }}
                    >
                        5-10 Lakh
                    </Button>
                    <Button
                        borderRadius="30px"
                        onClick={() => filterByBudget(1000001, 5000000)}
                        style={{
                            backgroundColor: activeRange === '1000001-5000000' ? '#6599d4' : '#D3D3D3',
                            color: activeRange === '1000001-5000000' ? 'white' : 'black',
                        }}
                    >
                        10-and above
                    </Button>
                    <Button
                        borderRadius="30px"
                        onClick={() => filterBySpeed(0, 200, 'under-200')}
                        style={{
                            backgroundColor: activeSpeedRange === 'under-200' ? '#6599d4' : '#D3D3D3',
                            color: activeSpeedRange === 'under-200' ? 'white' : 'black',
                        }}
                    >
                        Under 200 Max Speed
                    </Button>
                    <Button
                        borderRadius="30px"
                        onClick={() => filterBySpeed(200, 5000, 'above-200')}
                        style={{
                            backgroundColor: activeSpeedRange === 'above-200' ? '#6599d4' : '#D3D3D3',
                            color: activeSpeedRange === 'above-200' ? 'white' : 'black',
                        }}
                    >
                        Above 200 Max Speed
                    </Button>
                </Box>
                <Wrap justify="center" >
                    <SimpleGrid w="90%" gap="15px 21px" columns={[2, 4]} >
                        {data.map((el) => (
                            <Box key={el._id} w="100%" border={"1px solid grey"} paddingLeft={"13px"}>
                                <Box cursor={"pointer"} w="81%" m="auto" >
                                    <Image w="100%" src={el.image_url}></Image>
                                </Box>
                                <Box fontSize={["15px", "16px", "16px"]} fontWeight="semibold" overflow="hidden">
                                    <Text color="#6082B6" >{el.title}</Text>
                                </Box>

                                <Box display="flex" alignItems="center" >
                                    <Text color="black" fontWeight="semibold" fontSize="17px">  Rs. - {el.price} </Text>
                                    <Text as="s" m="3px 4px" fontSize="14px"> {Math.floor(el.price * 1.3)}</Text>
                                </Box>
                                <Box fontSize={["14px"]} fontWeight="semibold" overflow="hidden">
                                    <Text color="#36454F" >Model - {el.year}</Text>
                                </Box>
                                <Box fontSize={["14px"]} fontWeight="semibold" overflow="hidden">
                                    <Text color="#36454F" >Mileage - Avg. {el.mileage} /Kmpl</Text>
                                </Box>
                                <Box fontSize={["14px"]} fontWeight="semibold" overflow="hidden">
                                    <Text color="#36454F" >Max_Speed - {el.max_speed} Kmph</Text>
                                </Box>
                                <Box display="flex" m="auto" paddingTop={"7px"} paddingBottom={"5px"}>

                                    <Button onClick={handleCart} color={"teal.700"} _hover={{ bg: "#92bcb5" }} backgroundColor={"white"} mr="5px" size='sm' border={"1px solid teal"}>
                                        Buy Car
                                    </Button>
                                    {/* <Button _hover={{ bg: "#92bcb5" }} variant="outline" color={"pink.300"} size='sm'>
                                    <IoIosHeart size="24px" ></IoIosHeart>
                                </Button> */}
                                </Box>
                            </Box>
                        ))}

                    </SimpleGrid>
                </Wrap>
            </Box>
        </div>
    )
}

export default Budget