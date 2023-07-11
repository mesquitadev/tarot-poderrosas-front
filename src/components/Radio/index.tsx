import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio as ChakraRadio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const Radio = ({ control, name, label, options, defaultValue, ...rest }: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
        <FormControl py={4} isInvalid={!!error}>
          {label && <FormLabel>{label}</FormLabel>}

          <RadioGroup
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={(value) => onChange(value)}
            value={value}
            defaultValue={defaultValue}
            {...rest}
          >
            <Stack direction='row'>
              {options.map((item: any, i: number) => (
                <ChakraRadio key={i} value={item.value}>
                  {item.label}
                </ChakraRadio>
              ))}
            </Stack>
          </RadioGroup>

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Radio;
