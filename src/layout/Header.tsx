import { Flex, Box } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
    return <Flex padding="0 10px" alignItems="center" justifyContent="space-between" minH="10vh">
        <Box fontWeight="semibold" >
            Wrappr
        </Box>
        <ConnectButton />
    </Flex>
}