import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { HiXCircle } from 'react-icons/hi';
import { Textarea } from '@chakra-ui/textarea';
import InputMask from 'react-input-mask';

interface InputProps extends ChakraInputProps {
  control: Control;
  name: string;
  errors: any;
  label: string;
  subtitle?: string;
  mask?: string;
  textArea?: boolean;
  pinInput?: boolean;
  validatePassword?: boolean;
  rightIcon?: React.ReactElement | null;
  leftIcon?: React.ReactElement | null;
  disabled?: boolean;
}

function Input(
  { control, name, errors, label, textArea, pinInput, mask, ...rest }: InputProps,
  ref: any,
) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  const getError = (message: FieldError | undefined) => {
    if (message) {
      return (
        <Box mt='1' mb={{ base: '4', md: '6' }}>
          <FormErrorMessage mb='4' color='negative.pure' gap='1' ml='1'>
            <>
              <HiXCircle />
              {message}
            </>
          </FormErrorMessage>
        </Box>
      );
    }
    return null;
  };

  const getInputType = (onChange: any, onBlur: any, value: any, inputElementRef: any) => {
    if (mask) {
      return (
        <ChakraInput
          as={InputMask}
          mask={mask}
          focusBorderColor={errors ? 'negative.pure' : 'primary.dark'}
          onBlur={onBlur}
          onChange={onChange}
          value={value || ''}
          ref={inputElementRef}
          {...rest}
        />
      );
    } else if (textArea) {
      return (
        // @ts-ignore
        <Textarea
          focusBorderColor={errors ? 'negative.pure' : 'primary.dark'}
          onBlur={onBlur}
          onChange={onChange}
          value={value || ''}
          ref={inputElementRef}
          {...rest}
        />
      );
    } else if (pinInput) {
      return (
        <HStack>
          <PinInput
            onChange={onChange}
            value={value || ''}
            focusBorderColor={errors ? 'negative.pure' : 'primary.dark'}
          >
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
      );
    } else {
      return (
        <ChakraInput
          focusBorderColor={errors ? 'negative.pure' : 'primary.dark'}
          onBlur={onBlur}
          onChange={onChange}
          value={value || ''}
          ref={inputElementRef}
          {...rest}
        />
      );
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <>
          <FormControl id={name} isInvalid={!!errors}>
            {label && (
              <FormLabel htmlFor={name} _invalid={{ color: 'negative.pure !important' }}>
                {label}
              </FormLabel>
            )}
            {getInputType(onChange, onBlur, value, ref)}
            {getError(errors)}
          </FormControl>
        </>
      )}
    />
  );
}

export default forwardRef(Input);
