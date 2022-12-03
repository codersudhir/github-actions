import logo from './logo.svg';
import axios from "axios"
import './App.css';
import { Button, ButtonGroup, Flex, Heading, Spacer,Box, Grid, GridItem,Text,Image } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

const getdata=(querry)=>{
  return axios.get(`https://api.github.com/search/repositories?q=stars:%3E1+language:${querry}`)
}


function App() {
  const [querry,setquerry]=useState("ALL")
  const [data,setdata]=useState([])
  useEffect(()=>{
    getdata(querry).then((Res)=>setdata(Res.data.items))
  },[querry])

  return (
    <div className="App">
      <Flex minWidth='max-content' alignItems='center' gap='10' justifyContent="space-evenly" marginTop="25px">
      <ButtonGroup gap='2'>
    <Button colorScheme='teal' onClick={()=>setquerry("ALL")}>All</Button>
  </ButtonGroup>

  <ButtonGroup gap='2'>
    <Button colorScheme='teal'  onClick={()=>setquerry("HTML")}>HTML</Button>
  </ButtonGroup>

  <ButtonGroup gap='2'>
    <Button colorScheme='teal'  onClick={()=>setquerry("CSS")}>CSS</Button>
  </ButtonGroup>

  <ButtonGroup gap='2'>
    <Button colorScheme='teal' onClick={()=>setquerry("javascript")}>Javascript</Button>
  </ButtonGroup>
</Flex>

<Grid  w="full"
   templateColumns={{
    base:"repeat(1,1fr)",
    md:"repeat(2,1fr)",
    lg:"repeat(4,1fr)"
   }} marginTop="15px" width="100%" gap={10} textAlign="center" alignContent="center" >
    {data.map((el)=>{
      return <GridItem   gap={5} border="1px solid black;" key={el.id} >
        <Image src={el.owner.avatar_url} width="200px" marginLeft="10%" />
      <Text fontSize="15px">{el.name}</Text>
      <Text> Froks{el.forks_count}</Text>
    <Text>Language :{el.language}</Text>
    <Text> Starcount : {el.stargazers_count}</Text>
    </GridItem>
    })}
 </Grid>

    </div>
  );
}

export default App;
