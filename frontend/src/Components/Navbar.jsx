import React from 'react'
import { Box, Center, Container, Grid, Text, Input, Img, InputGroup, InputLeftElement, Flex, Button } from '@chakra-ui/react'

import { AiOutlineSearch } from "react-icons/ai";
import "../Styles/Navbar.css"
const Navbar = () => {
    return (
        <>
            <header id='Navbar'>
                <nav>
                    <Container maxW={{ md: '100%', lg: '100%' }} pt={{ lg: 2 }}>
                        <Grid templateColumns={{ lg: 'repeat(6, 1fr)' }} gap={1} >
                            <Box w={{ lg: '100%' }} h={{ lg: '55px' }} >
                                <Center><Img w={{ lg: "80%" }} pt={{ lg: 2 }} src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" alt="logo" /></Center>
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
                            <Box w={{ lg: '100%' }} h={{ lg: '50px' }} >
                                <Flex gap={1} >
                                    <Button mt={{ lg: 1 }} colorScheme='teal' size='md'>
                                        Button
                                    </Button>
                                    <Button mt={{ lg: 1 }} colorScheme='teal' size='md'>
                                        Button
                                    </Button>
                                </Flex>
                            </Box>
                        </Grid>
                    </Container>
                </nav>
            </header>
        </>
    )
}

export default Navbar