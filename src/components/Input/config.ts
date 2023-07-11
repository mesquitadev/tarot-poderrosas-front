interface TypeConfig {
  format?: string;
  placeholder: string;
}

export const TypesConfigs: Record<string, TypeConfig> = {
  cpf: {
    placeholder: '999.999.999-99',
    format: '###.###.###-##',
  },
  cnpj: {
    placeholder: '99.999.999/9999-99',
    format: '##.###.###/####-##',
  },
  cel: {
    placeholder: '(99) 99999-9999',
    format: '(##) #####-####',
  },
  tel: {
    placeholder: '(99) 9999-9999',
    format: '(##) ####-####',
  },
};
