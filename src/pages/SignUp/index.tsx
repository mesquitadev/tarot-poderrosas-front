import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useLoading } from '@/hooks/useLoading';

import { Button, Flex, Heading, HStack, Image, Stack, useToast, VStack } from '@chakra-ui/react';
import { Input, Select } from '@/components';
import { useEffect, useState } from 'react';
import logo from '@/assets/images/logo-acai.svg';
import { removeMask, validarCPF } from '@/utils';
import { AxiosError } from 'axios';
import api from '@/services';
import { useHistory } from 'react-router-dom';

type SignUpFormData = {
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const signInFormSchema = yup.object().shape({
    firstName: yup.string().required('Este campo é obrigatório'),
    lastName: yup.string().required('Este campo é obrigatório'),
    cpf: yup
      .string()
      .required('Este campo é obrigatório')
      .test('test-invalid-cpf', 'CPF Inválido', (cpf: string | undefined) => validarCPF(cpf)),
    email: yup.string().required('Este campo é obrigatório').email('E-mail inválido'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(6)
      .typeError('A senha precisa ter no minimo 6 caracteres'),
    passwordConfirmation: yup
      .string()
      .required('A confirmação da senha é obrigatoria!')
      .oneOf([yup.ref('password'), null], 'As senhas digitadas não conferem'),
  });

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const imageUrls = [
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682431925/Acai%20Sunset/DSCF3050_z4ymvm.jpg',
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682432059/Acai%20Sunset/DSCF3062_msdtel.jpg',
      'https://res.cloudinary.com/dxin0mfj4/image/upload/v1682425781/Acai%20Sunset/DSCF3402_wpwqlq.jpg',
    ];

    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const randomImageUrl = imageUrls[randomIndex];
    setImageUrl(randomImageUrl);
  }, []);

  const { loading, setLoading } = useLoading();
  const toast = useToast();
  const { handleSubmit, formState, control } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(signInFormSchema),
  });

  const { errors } = formState;
  const history = useHistory();
  const handleSignUp: SubmitHandler<SignUpFormData> = async (values: SignUpFormData) => {
    try {
      setLoading(true);
      values.cpf = removeMask(values.cpf);
      await api.post('/users', values);
      setLoading(false);
      history.push('/confirm-account');
    } catch (err) {
      const error = err as AxiosError;
      toast({
        title: 'Erro ao realizar cadastro!',
        description: error?.response?.data.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    {
      value: 'Heterossexual',
      label: 'Heterossexual',
    },
    {
      value: 'Homossexual',
      label: 'Homossexual',
    },
    {
      value: 'Assexual',
      label: 'Assexual',
    },
    {
      value: 'Bissexual',
      label: 'Bissexual',
    },
    {
      value: 'Queer',
      label: 'Queer',
    },
    {
      value: 'Omnissexual',
      label: 'Omnissexual',
    },
    {
      value: 'Panssexual',
      label: 'Panssexual',
    },
    {
      value: 'Prefiro não responder',
      label: 'Prefiro não responder',
    },
  ];

  return (
    <Stack
      minH={'100vh'}
      direction={{ base: 'column', md: 'row' }}
      bgColor='primary.dark'
      className='bg-1'
    >
      <Flex flex={1} align={'center'} justify={'center'}>
        <Stack
          as='form'
          // @ts-ignore
          onSubmit={handleSubmit(handleSignUp)}
          bgColor='white'
          p={8}
          borderRadius={5}
        >
          <VStack>
            <Image src={logo} width={150} />
            <Heading fontSize={'2xl'}>Bem vindo ao ClubSunset</Heading>
          </VStack>
          <HStack>
            <Input
              name='firstName'
              type='text'
              control={control}
              errors={errors.firstName && errors.firstName.message}
              label={'Nome'}
            />
            <Input
              name='lastName'
              type='text'
              control={control}
              errors={errors.lastName && errors.lastName.message}
              label={'Sobrenome'}
            />
          </HStack>
          <HStack>
            <Input
              name='cpf'
              mask='999.999.999-99'
              type='text'
              control={control}
              errors={errors.cpf && errors.cpf.message}
              label={'CPF'}
            />
            <Input
              name='phone'
              mask='(99)99999-9999'
              type='text'
              control={control}
              errors={errors.phone && errors.phone.message}
              label={'Telefone'}
            />
          </HStack>
          <HStack>
            <Input
              name='birthdate'
              type='date'
              control={control}
              errors={errors.birthdate && errors.birthdate.message}
              label={'Data de Nascimento'}
            />
            <Select
              options={genderOptions}
              name='gender'
              control={control}
              errors={errors.gender && errors.gender.message}
              label={'Gênero'}
            />
          </HStack>
          <Input
            name='email'
            type='email'
            control={control}
            errors={errors.email && errors.email.message}
            label={'Email'}
          />
          <Input
            name='password'
            type='password'
            control={control}
            errors={errors.password && errors.password.message}
            label={'Senha'}
          />
          <Input
            name='passwordConfirmation'
            type='password'
            control={control}
            errors={errors.passwordConfirmation && errors.passwordConfirmation.message}
            label={'Confirmar Senha'}
          />
          <Stack spacing={6}>
            <Button
              type='submit'
              isLoading={loading}
              bgColor='primary.darkest'
              _hover={{ bgColor: 'primary.dark' }}
              color='white'
              variant={'solid'}
            >
              Cadastre-se
            </Button>

            <VStack>
              <Heading fontSize={'sm'}> ClubSunset &copy; Montreal Tecnologia</Heading>
              <Heading fontSize={'sm'}>v1.0.0</Heading>
            </VStack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} display={{ base: 'none', sm: 'none', md: 'flex' }}>
        <Image alt={'Login Image'} objectFit={'cover'} src={imageUrl} />
      </Flex>
    </Stack>
  );
}
