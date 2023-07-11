/**
 * Formata um valor numérico como moeda no formato "R$ 1.000,00".
 *
 * @param amount O valor numérico a ser formatado.
 * @returns A string formatada como moeda.
 */
export const formatCurrency = (amount: number) => {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);
};

/**
 * Remove todas as chaves de objeto que possuem valores nulos ou indefinidos.
 *
 * @param object O objeto a ser limpo.
 * @returns O objeto sem as chaves com valores nulos ou indefinidos.
 */
export const cleanObject = (object: any): any => {
  if (typeof object !== 'object') return object;

  Object.entries(object).forEach(([k, v]: [string, any]) => {
    if (v && typeof v === 'object') cleanObject(v);

    if (v === null || v === undefined) {
      object[k] = '';
    }
  });

  return object;
};

/**
 * Remove todos os caracteres não numéricos de uma string, deixando apenas os números.
 *
 * @param cpf A string contendo o CPF a ser formatado.
 * @returns A string com apenas os números do CPF.
 */
export function removeMask(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

export function validarCPF(cpf: string | undefined) {
  if (!cpf) {
    return false;
  }
  cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (caso inválido)
  if (/^(\d)\1*$/.test(cpf)) {
    return false;
  }

  // Validação dos dígitos verificadores
  const digitos = cpf.split('').map(Number);
  const dv1 = digitos[9]; // Primeiro dígito verificador
  const dv2 = digitos[10]; // Segundo dígito verificador

  // Cálculo do primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += digitos[i] * (10 - i);
  }
  let resto = soma % 11;
  const calcDv1 = resto < 2 ? 0 : 11 - resto;

  if (calcDv1 !== dv1) {
    return false;
  }

  // Cálculo do segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += digitos[i] * (11 - i);
  }
  resto = soma % 11;
  const calcDv2 = resto < 2 ? 0 : 11 - resto;

  if (calcDv2 !== dv2) {
    return false;
  }

  return true;
}
