import {
  Checkbox as ChakraCheckbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

import { Controller } from 'react-hook-form';

const Checkbox = ({ control, name, label, placeholder, options, defaultValue, ...rest }: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name, ref }, fieldState: { error } }) => (
        <FormControl py={4} isInvalid={!!error}>
          {label && <FormLabel>{label}</FormLabel>}

          <CheckboxGroup name={name} ref={ref} value={value} defaultValue={defaultValue} {...rest}>
            <ChakraCheckbox onChange={(value) => onChange(value)}>{placeholder}</ChakraCheckbox>
          </CheckboxGroup>

          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default Checkbox;
