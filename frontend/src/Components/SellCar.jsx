import React, { useEffect, useState } from 'react'
import axios from "axios";
import {
    Box, Text, Image, Button, Wrap, SimpleGrid, useToast, Heading, FormControl, FormLabel, Input,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';

const SellCar = () => {

    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()

    const [editId, seteditId] = useState("")
    const [title, settitle] = useState("")
    const [image_url, setimage_url] = useState("")
    const [year, setyear] = useState(0)
    const [price, setprice] = useState(0)
    const [color, setcolor] = useState("")
    const [mileage, setmileage] = useState(0)
    const [max_speed, setmax_speed] = useState(0)
    const [data, setData] = useState([]);
    const CarToken = (localStorage.getItem("Cartoken"))

    useEffect(() => {
        Getcar()

    }, [])
    const Getcar = () => {
        axios.get("https://dull-tan-piglet.cyclic.app/cars", {
            headers: {
                'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTQ2ODI3ZmI2YTU3OTFiZjQ1ZmQzOTgiLCJpYXQiOjE2OTkxMTk3NTUsImV4cCI6MTY5OTEyMzM1NX0.d4hi-hduHx7ek1fPL_yu0Ovt2JFSh7RPjwn7X30988U"
            }
        })
            .then((res) => setData(res.data.data))
            .catch((er) => console.log(er))
    }

    console.log(data)

    const handleadd = () => {
        if (image_url && title && price && year && max_speed && mileage) {
            const cardata = {
                image_url,
                title,
                price,
                color,
                year,
                mileage,
                max_speed

            };
            axios.post("https://dull-tan-piglet.cyclic.app/cars", cardata, {
                headers: {
                    'Authorization': CarToken
                }
            })
                .then((res) => {
                    toast({
                        title: "Car Details Added",
                        description: "Car Details added Successfully",
                        status: "success",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                    console.log(res)
                    setimage_url("");
                    settitle("");
                    setprice("");
                    setcolor("");
                    setyear("");
                    setmileage("");
                    setmax_speed("");
                })
            Getcar()
            onCloseCreate()
            Getcar()
        }
        else {
            toast({
                title: "Error",
                description: "Please Enter all the detail",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }

    }

    const handleDelete = (id) => {
        axios.delete(`https://dull-tan-piglet.cyclic.app/cars/${id}`, {
            headers: {
                'Authorization': CarToken
            }
        })
            .then((res) => {
                console.log(res)
                if (res.data.msg == "deleted") {
                    toast({
                        title: "Deleted",
                        description: "Item Deleted from DataBase",
                        status: "error",
                        position: "top",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            })
        Getcar()

    }

    const handleEdit = () => {
        if (editId) {
            axios.get(`https://dull-tan-piglet.cyclic.app/cars/${editId}`, {
                headers: {
                    'Authorization': CarToken
                }
            })
                .then((res) => {
                    console.log(res.data.title)
                    if (res.data.title) {
                        console.log(editId)
                        const cardata = {
                            image_url: image_url || res.data.image_url,
                            title: title || res.data.title,
                            price: price || res.data.price,
                            color: color || res.data.color,
                            year: year || res.data.year,
                            mileage: mileage || res.data.mileage,
                            max_speed: max_speed || res.data.max_speed

                        };
                        axios.patch(`https://dull-tan-piglet.cyclic.app/cars/${editId}`, cardata, {
                            headers: {
                                'Authorization': CarToken
                            }
                        })
                            .then((res) => {
                                console.log(res)
                                if (res.data.msg == "Edited") {
                                    toast({
                                        title: "Item Edited",
                                        description: "Item Edit Successfully from DataBase",
                                        status: "success",
                                        position: "top",
                                        duration: 3000,
                                        isClosable: true,
                                    });
                                }
                                setimage_url("");
                                settitle("");
                                setprice("");
                                setcolor("");
                                setyear("");
                                setmileage("");
                                setmax_speed("");
                            })
                        Getcar()
                        onCloseLogin()
                        Getcar()
                    }
                    else {
                        toast({
                            title: "Error",
                            description: "Item Error",
                            status: "error",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                })

        }


    }

    return (
        <>{
            CarToken ? <div>
                <Box textAlign={"center"} marginTop={"29px"}>
                    <Heading borderBottom={"2px solid orange"} width={"13%"} margin={"auto"}>Car Delars</Heading>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                    <Box margin={"13px 2px 5px 65px"} alignItems={"flex-start"} fontFamily={"LatoGoogle,Lato,LatoWeb,sans-serif;"} color={"#484848"} fontWeight={"semibold"} fontSize={"15px"}>
                        <Heading>Car Collection</Heading>
                    </Box>
                    <Box margin={"33px 67px 13px 59px"} >
                        <Button border={"1px solid yellow"} backgroundColor={"orange.600"} color={"white"} onClick={onOpenCreate}>Add More Cars</Button>
                    </Box>
                </Box>

                <Wrap justify="center" >

                    <SimpleGrid w="90%" gap="15px 21px" columns={[2, 4]} >
                        {
                            data?.map((el) => (
                                <Box key={el._id} w="100%" border={"1px solid grey"} paddingLeft={"13px"}>
                                    <Box cursor={"pointer"} w="81%" m="auto" h="135px" >
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

                                        <Button onClick={() => {
                                            seteditId(el._id);
                                            onOpenLogin();
                                        }} color={"teal.700"} _hover={{ bg: "#92bcb5" }} backgroundColor={"white"} mr="7px" size='sm' border={"1px solid teal"}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(el._id)} _hover={{ bg: "#92bcb5" }} variant="outline" color={"red.500"} size='sm' border={"1px solid red"}>
                                            Delete
                                        </Button>
                                    </Box>
                                </Box>
                            ))
                        }

                    </SimpleGrid>
                </Wrap>
                <Box width={"90%"} margin={"auto"} marginTop={"31px"} marginBottom={"11px"}>
                    <Image src="https://pictures.dealer.com/c/chapmanlancasterfordfd/0335/b4896115eb2fd42a0b1159ce210ed381x.jpg"></Image>
                </Box>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpenCreate}
                    onClose={onCloseCreate}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add Car Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={4}>
                            < FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input ref={initialRef} value={title}
                                    onChange={(e) => settitle(e.target.value)} borderRadius={"21px"} placeholder='Name of car' />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Image_Url</FormLabel>
                                <Input value={image_url}
                                    onChange={(e) => setimage_url(e.target.value)} borderRadius={"21px"} placeholder='Image Url' />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Price</FormLabel>
                                <Input value={price}
                                    onChange={(e) => setprice(e.target.value)} borderRadius={"21px"} placeholder='Enter price' />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Model</FormLabel>
                                <Input value={year}
                                    onChange={(e) => setyear(e.target.value)} borderRadius={"21px"} placeholder='Enter Model' />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Mileage</FormLabel>
                                <Input value={mileage}
                                    onChange={(e) => setmileage(e.target.value)} borderRadius={"21px"} placeholder='Enter Mileage' />
                            </FormControl>
                            <FormControl isRequired mt={3}>
                                <FormLabel>Max_Speed</FormLabel>
                                <Input value={max_speed}
                                    onChange={(e) => setmax_speed(e.target.value)} borderRadius={"21px"} placeholder='Enter Max_Speed' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleadd} colorScheme="yellow" mr={3}>
                                Add car
                            </Button>
                            <Button colorScheme="red" onClick={onCloseCreate}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpenLogin}
                    onClose={onCloseLogin}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader color={"green"}>Edit Car Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={4}>
                            < FormControl >
                                <FormLabel>Title</FormLabel>
                                <Input ref={initialRef} value={title}
                                    onChange={(e) => settitle(e.target.value)} borderRadius={"21px"} placeholder='Name of car' />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Image_Url</FormLabel>
                                <Input value={image_url}
                                    onChange={(e) => setimage_url(e.target.value)} borderRadius={"21px"} placeholder='Image Url' />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Price</FormLabel>
                                <Input value={price}
                                    onChange={(e) => setprice(e.target.value)} borderRadius={"21px"} placeholder='Enter price' />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Model</FormLabel>
                                <Input value={year}
                                    onChange={(e) => setyear(e.target.value)} borderRadius={"21px"} placeholder='Enter Model' />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Mileage</FormLabel>
                                <Input value={mileage}
                                    onChange={(e) => setmileage(e.target.value)} borderRadius={"21px"} placeholder='Enter Mileage' />
                            </FormControl>
                            <FormControl mt={3}>
                                <FormLabel>Max_Speed</FormLabel>
                                <Input value={max_speed}
                                    onChange={(e) => setmax_speed(e.target.value)} borderRadius={"21px"} placeholder='Enter Max_Speed' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleEdit} colorScheme="teal" mr={3}>
                                Edit
                            </Button>
                            <Button colorScheme="red" onClick={onCloseLogin}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div > : <Box h={"530px"}>
                <Alert status='error' marginTop={"31px"} height={"51px"}>
                    <AlertIcon />
                    <AlertTitle>You Have loged Out!</AlertTitle>
                    <AlertDescription>Please Login To visit this Page.</AlertDescription>
                </Alert>
            </Box>}
        </>

    )
}

export default SellCar