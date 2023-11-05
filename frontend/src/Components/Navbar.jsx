import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Center, Container, Grid, Text, Input, Img, InputGroup, InputLeftElement, Flex, Button, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom"
import "../Styles/Navbar.css"
import { Link } from 'react-router-dom'
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const navigate = useNavigate();
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [name, setName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handlenavigate = () => {

    }
    const handlesignup = (e) => {
        e.preventDefault()
        if (name && email && password) {
            const user = {
                name,
                email,
                password,

            };
            axios.post("http://localhost:8080/users/register", user)
                .then((res) => {
                    console.log(res)
                    if (res.data = "Signup Successfully") {
                        toast({
                            title: "Account created.",
                            description: "Successfully Created your Account",
                            status: "success",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        });
                    } else {
                        toast({
                            title: "Error",
                            description: "Something went wrong",
                            status: "error",
                            position: "top",
                            duration: 3000,
                            isClosable: true,
                        });
                    }
                })
            // localStorage.setItem('user', JSON.stringify(user));

            onClose()
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
    return (
        <>
            <header id='Navbar'>
                <nav>
                    <Container maxW={{ md: '100%', lg: '100%' }} pt={{ lg: 2 }}>
                        <Grid templateColumns={{ lg: 'repeat(6, 1fr)' }} gap={1} >
                            <Box w={{ lg: '100%' }} h={{ lg: '55px' }} >
                                <Link to="/"><Center><Img w={{ lg: "80%" }} pt={{ lg: 2 }} src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" alt="logo" /></Center></Link>
                            </Box>
                            <Box w={{ lg: '60%' }} h={{ lg: '50px' }} >
                                <Center><Text fontSize={{}} color={'#4C4C4C'} pt={{ lg: 3 }}> <b>NEW CARS</b></Text></Center>
                            </Box>
                            <Box w={{ lg: '60%' }} ml={{ lg: '-35%' }} h={{ lg: '55px' }} >
                                <Center><Text color={'#4C4C4C'} pt={{ lg: 3 }}> <b>USED CARS</b></Text></Center>
                            </Box>
                            <Box w={{ lg: '80%' }} ml={{ lg: '-70%' }} h={{ lg: '50px' }} >
                                <Center><Text color={'#4C4C4C'} pt={{ lg: 3 }}> <b>REVIEWS & NEWS</b></Text></Center>
                            </Box>
                            <Box w={{ lg: '100%' }} h={{ lg: '50px' }} ml={{ lg: '-35%' }}>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                        <AiOutlineSearch />
                                    </InputLeftElement>
                                    <Input border={'1px solid'} mt={{ lg: 1 }} htmlSize={34} width='auto' placeholder='Find Your Loved One Car' />
                                </InputGroup>
                            </Box>
                            <Box w={{ lg: '100%' }} h={{ lg: '50px' }} marginRight={"30px"}>
                                <Flex gap={9} >
                                    <Link to="/sell"><Button onClick={() => navigate("/sell")} mt={{ lg: 1 }} colorScheme="orange" size='md'>
                                        Sell Car
                                    </Button></Link>
                                    <Button onClick={onOpen} mt={{ lg: 1 }} colorScheme='orange' size='md'>
                                        Signup
                                    </Button>
                                </Flex>
                            </Box>
                        </Grid>
                    </Container>
                </nav>
                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            < FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input ref={initialRef} value={name}
                                    onChange={(e) => setName(e.target.value)} borderRadius={"21px"} placeholder='Enter your Name' />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Email</FormLabel>
                                <Input value={email}
                                    onChange={(e) => setEmail(e.target.value)} borderRadius={"21px"} placeholder='Enter your Email' />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel>Password</FormLabel>
                                <Input value={password}
                                    onChange={(e) => setPassword(e.target.value)} borderRadius={"21px"} placeholder='Enter your Password' />
                            </FormControl>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlesignup} colorScheme='red' mr={3}>
                                Signup
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </header>
        </>
    )
}

export default Navbar