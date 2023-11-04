import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import {
    Box, Text, Image, Button, Wrap, SimpleGrid, useToast
} from "@chakra-ui/react";
import { IoIosHeart } from "react-icons/io";


const Home = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/cars", {
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2ODI3ZmI2YTU3OTFiZjQ1ZmQzOTgiLCJpYXQiOjE2OTkxMTk3NTUsImV4cCI6MTY5OTEyMzM1NX0.d4hi-hduHx7ek1fPL_yu0Ovt2JFSh7RPjwn7X30988U"
            }
        })
            .then((res) => setData(res.data.data))
            .catch((er) => console.log(er))
    }, [])

    console.log(data)
    return (
        <div>
            <Wrap justify="center">
                <SimpleGrid w="90%" gap="15px 2px" columns={[2, 4]} >
                    {
                        data?.map((el) => (
                            <Box key={el._id} w="100%" textAlign="center">
                                <Box cursor={"pointer"} w="81%" m="auto">
                                    <Image w="100%" src={el.image_url}></Image>
                                </Box>
                                <Box fontSize={["15px", "16px", "16px"]} fontWeight="semibold" h={["41px", "46px", "48px"]} overflow="hidden">
                                    <Text p="3px 7px" >{el.title}</Text>
                                </Box>
                                <Box w="39%" display={"flex"} gap="5px" margin="auto" alignItems="center" justifyContent="center">
                                    <Text fontSize="17px">{el.ratings}</Text>
                                    <Image w="100%" src="https://static.vecteezy.com/system/resources/previews/004/256/658/original/five-star-customer-product-ratings-review-flat-icons-for-apps-and-websites-illustration-of-five-golden-yellow-stars-in-a-row-isolated-in-a-white-background-concepts-for-ratings-customers-review-free-vector.jpg"></Image>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Text color="teal" fontWeight="semibold" fontSize="17px">  $ {el.price} </Text>
                                    {/* <Text as="s" m="3px 4px" fontSize="14px"> $ {Math.floor(el.strike_price * 5)}</Text> */}
                                </Box>
                                <Box display="flex" m="auto" alignItems="center" justifyContent="center">

                                    <Button _hover={{ bg: "#92bcb5" }} backgroundColor={"pink.300"} mr="5px" size='sm'>
                                        Add to Cart
                                    </Button>
                                    <Button _hover={{ bg: "#92bcb5" }} variant="outline" color={"pink.300"} size='sm'>
                                        <IoIosHeart size="24px" ></IoIosHeart>
                                    </Button>
                                </Box>
                            </Box>
                        ))
                    }

                </SimpleGrid>
            </Wrap>
        </div>
    )
}

export default Home