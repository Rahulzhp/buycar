import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import {
    Box, Text, Image, Button, Wrap, SimpleGrid, useToast, Heading
} from "@chakra-ui/react";

import Landingpage from './Landingpage';
import Budget from './Budget';


const Home = () => {
    const toast = useToast()
    const [data, setData] = useState([]);
    const CarToken = (localStorage.getItem("Cartoken"))

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
    const handleCart = () => {
        if (CarToken) {
            toast({
                title: `Order Placed`,
                description: "After 2 Days you will get call",
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
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
            <Landingpage />
            <Box margin={"21px 2px 5px 65px"} alignItems={"flex-start"} fontFamily={"LatoGoogle,Lato,LatoWeb,sans-serif;"} color={"#484848"} fontWeight={"semibold"} fontSize={"17px"}>
                <Heading>Featured Cars</Heading>
            </Box>
            <Wrap justify="center" >

                <SimpleGrid w="90%" gap="15px 21px" columns={[2, 4]} >
                    {
                        data?.map((el) => (
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
                        ))
                    }

                </SimpleGrid>
            </Wrap>
            <Budget />
            <Box width={"91%"} margin={"auto"} marginTop={"31px"}>
                <Image src="https://pictures.dealer.com/c/chapmanlancasterfordfd/0335/b4896115eb2fd42a0b1159ce210ed381x.jpg"></Image>
            </Box>
        </div>
    )
}

export default Home