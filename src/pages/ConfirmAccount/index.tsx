import { Button, Center, Flex, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react';
import logo from '@/assets/images/logo-acai.svg';

export default function ConfirmAccount() {
  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      bgColor='primary.dark'
      className='bg-1'
    >
      <Flex flex={1} align={'center'} justify={'center'} px={2} py={2}>
        <Stack bgColor='white' p={8} borderRadius={5}>
          <VStack>
            <Image src={logo} width={150} />
            <Heading fontSize={'2xl'}>Obrigado!!!</Heading>
          </VStack>
          <Center>
            <Text fontSize='lg' align='center'>
              Obrigado por criar a sua conta no clubsunset, por isso, estamos te dando um cupom de
              desconto de 10% para usar em nossas lojas por 24H. <br /> Para acessar o cupom, vá até
              a àrea <br />
              <b> MEUS CUPONS</b> no <b>APP</b> !!! <br /> Corra e aproveite!!!
            </Text>
          </Center>
          <Stack spacing={6}>
            <Button
              type='submit'
              bgColor='primary.darkest'
              _hover={{ bgColor: 'primary.dark' }}
              color='white'
              variant={'solid'}
            >
              Voltar para o APP
            </Button>

            <VStack spacing={2}>
              <Text fontSize={'sm'}> ClubSunset &copy; Montreal Tecnologia</Text>
              <Text fontSize={'sm'}>v1.0.0</Text>
            </VStack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
