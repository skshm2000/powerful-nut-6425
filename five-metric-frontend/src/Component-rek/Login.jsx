import {
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Image,Text,Box
  } from '@chakra-ui/react';
  import {FcGoogle, }from "react-icons/fc"
import {FaMicrosoft }from "react-icons/fa"
import {FaApple }from "react-icons/fa"
import { useState } from 'react';
import axios from"axios"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../GsAssets/navbarLogo.jpg";
  
  const Login=()=> {
    const navigate = useNavigate()
    const [error, changeError] = useState("")
    const [user,setUser]=useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
    const {name,value}=e.target
    setUser({...user,[name]:value})
    }

    const handleNavigate = () =>{
        navigate("/signup")
    } 
    //console.log(user)
    const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post("https://five-metric.onrender.com/login",{
        username:user.username,
        password:user.password
      })
      .then((response)=>{
     console.log(response.data)
     if(response.data.token){
      localStorage.setItem("token", (response.data.token))
      navigate("/time")
      } else {
        changeError(response.data.error)
      }
      })
      .catch((err)=>{
        console.log(err)
      })
    }
   
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          border={"1px solid lightgrey"}
          boxShadow={'lg'}
          my={12}>
            
            <Box backgroundColor={"#F2F5FC"} borderRadius="10px" pt="50px">
            <Image src={logo}  width={"162px"} margin='auto' marginTop={"0px"} backgroundColor={"#F2F5FC"}/>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl',lg:"1.625rem" }}  fontWeight={"12px"} color={"black"} backgroundColor={"#F2F5FC"} pb="17px" mt="12px" textAlign="center">
          Log into 5Metric
          </Heading>
            </Box>
         <Stack p={6}>
          <form onSubmit={handleSubmit}>
             <FormControl  >
            <FormLabel fontSize={"14px"} color={"#777e85"}>Username </FormLabel>
            <Input
              placeholder="Enter Username"
              height={"34px"}
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={user.username} name="username" onChange={handleChange} />
          </FormControl>
          <FormControl  >
            <FormLabel fontSize={"14px"} color={"#777e85"}>Password</FormLabel>
            <Input type="password"   placeholder="Enter your password" height={"34px"} value={user.password} name="password" onChange={handleChange}/>
          </FormControl>
         <Text color='red'>{error}</Text>
            <Button
            type="submit"
              bg={'#3070f0'}
              height={"34px"} 
              fontSize={"14px"}
              color={'white'}
              marginTop={"12px"}
              w={"100%"}
              _hover={{
                bg: 'blue.500',
              }}>
              Log In
            </Button>
            </form>
            <Stack spacing={6}>
            <Divider orientation={'horizontal'}/>
            <Stack>
              <Button colorScheme={"none"} border={"1px solid lightgrey"} _hover={{bg: '#e2e6eb',}}  leftIcon={<FcGoogle fontSize={"20px"} /> } textColor={"#777E85"} variant={'solid'} height={"34px"} fontSize={"14px"}>
              Sign Up with Google
              </Button>
              <Button colorScheme={"none"} border={"1px solid lightgrey" }  _hover={{bg: '#e2e6eb',}}marginTop="-80px" leftIcon={<FaMicrosoft  fontSize={"20px"}/>} textColor={"#777E85"} variant={'solid'} height={"34px"} fontSize={"14px"}>
              Sign Up with Microsoft
              </Button>
              <Button colorScheme={"none"} border={"1px solid lightgrey"} _hover={{bg: '#e2e6eb',}}leftIcon={<FaApple color={"black"} fontSize={"20px"}/>} textColor={"#777E85"} variant={'solid'} height={"34px"} fontSize={"14px"}>
              Sign Up with Apple
              </Button>
              </Stack>
              <Divider orientation={'horizontal'}  colorScheme={"black"}/>
              <Flex justifyContent={"space-between"}>
                <Text color={"#3070F0"} fontSize={"14px"}>Can't Log In?</Text>
               <Text cursor={'pointer'} onClick={handleNavigate} color={"#3070F0"} fontSize={"14px"}>Sign Up</Text>
              </Flex>
          </Stack>
          </Stack>
        </Stack>
      </Flex>
    );
  }

  export default Login