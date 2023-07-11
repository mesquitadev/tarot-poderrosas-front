export interface DefaultValidator {
  name: string;
  value: any;
  message: string;
}

export type CustomValidator = (value: any) => boolean | string;

export type FieldValidator = DefaultValidator | CustomValidator;

export const isEven: CustomValidator = (value: number) =>
  value % 2 === 0 || 'O valor precisa ser par';

export const required = (): DefaultValidator => ({
  name: 'required',
  value: true,
  message: 'Este campo é obrigatório',
});

export const minLength = (min: number): DefaultValidator => ({
  name: 'minLength',
  value: min,
  message: `A quantidade mínima de caracteres é ${min}`,
});

export const maxLength = (max: number): DefaultValidator => ({
  name: 'maxLength',
  value: max,
  message: `A quantidade máxima de caracteres é ${max}`,
});

export const min = (min: number): DefaultValidator => ({
  name: 'min',
  value: min,
  message: `O valor precisa ser maior ou igual que ${min}`,
});

export const max = (max: number): DefaultValidator => ({
  name: 'max',
  value: max,
  message: `O valor precisa ser menor ou igual que ${max}`,
});
