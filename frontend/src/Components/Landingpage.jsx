import React from 'react'
import { Box, Image, Link, Text } from "@chakra-ui/react";
import "../Styles/Landingpage.css"
import Home from './Home';
const Landingpage = () => {

    localStorage.setItem("carsdata", "rahul")
    return (
        <Box className="top_section_parent">
            <Box className="top_section_container">
                <Link>
                    <Text color={"blue.700"}>
                        SAVE UP TO 40% ON TOP FLOWERS & GIFTS! | SHOP NOW {">"}
                    </Text>
                </Link>
                <Box>
                    <Image w={"100%"} src="https://pictures.dealer.com/c/chapmanlancasterfordfd/0237/be3a785e80c018585caad9e9cad08420x.jpg" />
                </Box>
                <Home />
                <Box>
                    <Image src="https://pictures.dealer.com/c/chapmanlancasterfordfd/0335/b4896115eb2fd42a0b1159ce210ed381x.jpg"></Image>
                </Box>
            </Box>
        </Box>
    )
}

export default Landingpage