import 'moment/locale/pt-br';

import { DatePicker, Input, InputNumber, TimePicker, Upload } from 'antd';
import React, { useCallback } from 'react';

import { FieldValues } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { TypesConfigs } from './config';
import locale from 'antd/es/date-picker/locale/pt_BR';

import CustomField, { ICustomComponentProps, CustomFieldRenderArgs } from '../Field';

const { TextArea, Search, Group, Password } = Input;

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
  inputProps?: React.ComponentProps<typeof Input>;

  /* Antd `Input.TextArea` props */
  textAreaProps?: React.ComponentProps<typeof TextArea>;

  /* Antd `Input.Search` props */
  searchProps?: React.ComponentProps<typeof Search>;

  /* Antd `Input.Group` props */
  groupProps?: React.ComponentProps<typeof Group>;

  /* Antd `Input.Password` props */
  passwordProps?: React.ComponentProps<typeof Password>;

  /* Antd `InputNumber` props */
  inputNumberProps?: React.ComponentProps<typeof InputNumber>;

  /* Antd `TimePicker` props */
  timePickerProps?: React.ComponentProps<typeof TimePicker>;

  /* Antd `DatePicker` props */
  datePickerProps?: React.ComponentProps<typeof DatePicker>;

  /* NumberFormat props */
  numberFormatProps?: React.ComponentProps<typeof NumberFormat>;

  /* Upload props */
  uploadProps?: React.ComponentProps<typeof Upload>;

  /* Upload children */
  children?: React.ReactElement;
}

const CustomInput = <T extends FieldValues>({
  type,
  placeholder,
  disabled,
  children,
  inputProps,
  textAreaProps,
  searchProps,
  groupProps,
  passwordProps,
  inputNumberProps,
  datePickerProps,
  timePickerProps,
  uploadProps,
  numberFormatProps,
  ...rest
}: ICustomInputProps<T>) => {
  const _render = useCallback(
    ({ field }: Partial<CustomFieldRenderArgs>) => {
      switch (type) {
        case 'currency':
          return (
            // @ts-ignore
            <NumberFormat
              value={field?.value}
              customInput={Input}
              allowNegative={false}
              decimalScale={2}
              disabled={disabled}
              thousandSeparator={'.'}
              decimalSeparator={','}
              fixedDecimalScale
              placeholder={'R$ 0,00'}
              prefix={'R$ '}
              isNumericString
              format={(value) => {
                if (!Number(value)) return '';
                const amount = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(value) / 100);
                return `${amount}`;
              }}
              onValueChange={(values) => {
                if (values.floatValue) {
                  field?.onChange(values.floatValue / 100);
                } else {
                  field?.onChange(0);
                }
              }}
              {...numberFormatProps}
              data-testid={'currency-field'}
            />
          );

        case 'cpf':
        case 'cnpj':
        case 'cel':
        case 'tel':
          return (
            <NumberFormat
              value={field?.value}
              customInput={Input}
              disabled={disabled}
              allowNegative={false}
              placeholder={TypesConfigs[type].placeholder}
              format={TypesConfigs[type].format}
              onValueChange={(values) => {
                field?.onChange(values.value);
              }}
              mask={'_'}
              data-testid={`${type}-field`}
            />
          );
        case 'date':
          return (
            <DatePicker
              {...field}
              style={{
                width: '100%',
              }}
              locale={locale}
              {...datePickerProps}
              disabled={disabled}
              data-testid={'date-field'}
            />
          );
        case 'time':
          return (
            <TimePicker
              {...field}
              {...timePickerProps}
              disabled={disabled}
              data-testid={'time-field'}
            />
          );
        case 'password':
          return (
            <Password
              {...field}
              {...passwordProps}
              disabled={disabled}
              data-testid={'password-field'}
            />
          );
        case 'textArea':
          return (
            <TextArea
              {...field}
              {...textAreaProps}
              placeholder={placeholder}
              disabled={disabled}
              data-testid={'text-area-field'}
            />
          );
        case 'group':
          return <Group {...field} {...groupProps} />; //TODO: test
        case 'search':
          return (
            <Search
              {...field}
              {...searchProps}
              placeholder={placeholder}
              disabled={disabled}
              data-testid={'search-field'}
            />
          );
        case 'number':
          return (
            <InputNumber
              style={{
                width: '100%',
              }}
              value={field?.value}
              {...field}
              {...inputNumberProps}
              disabled={disabled}
              data-testid={'number-field'}
            />
          );
        case 'file':
          return (
            <Upload
              {...field}
              {...uploadProps}
              disabled={disabled}
              fileList={field?.value?.fileList}
              data-testid={'upload-field'}
            >
              {children}
            </Upload>
          );
        // case 'format':
        //   return (
        //     <NumberFormat
        //       customInput={Input}
        //       {...field}
        //       {...numberFormatProps}
        //       disabled={disabled}
        //       placeholder={placeholder}
        //       onValueChange={(values) => {
        //         field?.onChange(values.value);
        //       }}
        //       data-testid={'format-field'}
        //     />
        //   );
        default:
          return (
            <Input
              {...field}
              {...inputProps}
              placeholder={placeholder}
              disabled={disabled}
              data-testid={'input-field'}
            />
          );
      }
    },
    [
      type,
      placeholder,
      disabled,
      children,
      inputProps,
      textAreaProps,
      searchProps,
      groupProps,
      passwordProps,
      inputNumberProps,
      datePickerProps,
      timePickerProps,
      uploadProps,
      numberFormatProps,
    ],
  );

  return <CustomField {...rest} render={_render} />;
};

export default CustomInput;
