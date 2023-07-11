import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch as ChakraSwitch,
  SwitchProps as ChakraSwitchProps,
} from '@chakra-ui/react';
import { Control, Controller } from 'react-hook-form';

interface SwitchProps extends ChakraSwitchProps {
  control: Control;
  name: string;
  errors?: any;
  label?: string;
  disabled?: boolean;
}

function Switch({ control, name, errors, label, ...rest }: SwitchProps, ref: any) {
  const inputElementRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  const getError = (message: any) => {
    if (message) {
      return (
        <Box mt='1' mb={{ base: '4', md: '6' }}>
          <FormErrorMessage mb='4' color='negative.pure' gap='1' ml='1'>
            {message}
          </FormErrorMessage>
        </Box>
      );
    }
    return null;
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
            <ChakraSwitch
              focusBorderColor={errors ? 'negative.pure' : 'primary.dark'}
              onBlur={onBlur}
              onChange={onChange}
              value={value || ''}
              ref={ref}
              {...rest}
            />
            {getError(errors)}
          </FormControl>
        </>
      )}
    />
  );
}

export default forwardRef(Switch);
