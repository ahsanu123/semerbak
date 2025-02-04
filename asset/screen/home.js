import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import {
  NativeBaseProvider,
  Box, 
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
  AspectRatio,
  Heading,
  Container,
  Center,
  Avatar,
}from 'native-base';

export default function(){
    return(
      <ScrollView>
            
      <NativeBaseProvider>
      <Box
        bg="primary.700"
        py={4}
        px={3}
        rounded="md"
        width={475}
        maxWidth="100%"
      >
        <HStack justifyContent="space-between">
          
          <Box justifyContent="space-between" >
            <VStack space={2} >
  
              <Text fontSize="sm" color="white">Today @ 10PM</Text>
              <Text fontSize="lg" color="white">Let's talk about avatar!</Text>
  
            </VStack>
            
            <Pressable
              rounded="sm"
              bg="primary.400"
              alignSelf="flex-start"
              py={2}
              px={4}
            >
              <Text
                textTransform="uppercase"
                fontSize={'sm'}
                fontWeight="bold"
                color="white"
              >
                Remind ME
              </Text>
            </Pressable>
  
          </Box>
  
          <VStack
            justifyContent="center"
          >
            <Box>
              <Image
                source={{
                  uri: 'https://docs.nativebase.io/img/aang-avatar-state.gif',
                }}
                alt="Aang flying and surrounded by clouds"
                rounded="full"
                height={100}
                width={100}
              >
  
              </Image>
            </Box>
          </VStack>
        
        </HStack>
        
        <Box
          pt={10}
        >
          <AspectRatio ratio={16/9}>
            <Image
              roundedTop="lg"
              source={{
                uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
  
          <Box
            p={2}
            bg="white"
          >
              <Container>
                <Heading alignSelf="center">
                  Goldilocks and the Three Bears
                </Heading>
                <Heading alignSelf="center" pt={4} fontWeight="bold" size="sm">
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?
                </Heading>
                
              </Container>
          
          </Box>
  
  
        </Box>
      </Box>
    </NativeBaseProvider>
    </ScrollView>
  
    );
  }