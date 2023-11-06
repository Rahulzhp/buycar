import React from 'react'
import { Box, Image, Link, Text } from "@chakra-ui/react";
import "../Styles/Landingpage.css"

const Landingpage = () => {

    localStorage.setItem("carsdata", "rahul")
    return (
        <Box className="top_section_parent">
            <Box className="top_section_container">
                <Link>
                    <Text color={"blackAlpha.700"}>
                        BUY USED CAR TO 10% ON TOP MODELS & PRICE! | BUY NOW {">"}
                    </Text>
                </Link>
                

            </Box>
        </Box>
    )
}

export default Landingpage