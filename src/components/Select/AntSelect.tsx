import 'moment/locale/pt-br';

import { Select } from 'antd';
import React, { useCallback } from 'react';

import { FieldValues } from 'react-hook-form';
import CustomField, { CustomFieldRenderArgs, ICustomComponentProps } from '../Field';

export interface ICustomInputProps<T extends FieldValues> extends ICustomComponentProps<T> {
  /* What type of input should the field be or accept */
  type?:
    | 'currency'
    | 'text'
    | 'number'
    | 'cpf'
    | 'cnpj'
    | 'date'
    | 'time'
    | 'password'
    | 'cel'
    | 'tel'
    | 'format'
    | 'group'
    | 'search'
    | 'textArea'
    | 'file';

  /* Input placeholder */
  placeholder?: string;

  /* Antd Input props */
  selectProps?: React.ComponentProps<typeof Select>;
}

const CustomSelect = <T extends FieldValues>({
  placeholder,
  disabled,
  selectProps,
  ...rest
}: ICustomInputProps<T>) => {
  const _render = useCallback(
    ({ field }: Partial<CustomFieldRenderArgs>) => {
      return (
        <Select
          {...field}
          {...selectProps}
          placeholder={placeholder ? placeholder : 'Selecione uma opção'}
          disabled={disabled}
          data-testid={'input-field'}
          showSearch
          optionFilterProp='children'
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      );
    },
    [selectProps, placeholder, disabled],
  );

  return <CustomField {...rest} render={_render} />;
};

export default CustomSelect;
