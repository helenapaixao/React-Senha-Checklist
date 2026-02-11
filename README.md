# React Senha Checklist

[![NPM](https://nodei.co/npm/react-senha-checklist.png?compact=true)](https://nodei.co/npm/react-senha-checklist/)
[![npm version](https://badge.fury.io/js/react-senha-checklist.svg)](https://badge.fury.io/js/react-senha-checklist)
[![NPM License](https://img.shields.io/npm/l/react-senha-checklist.svg)](https://www.npmjs.com/package/react-senha-checklist)

Componente React para exibir em tempo real o cumprimento das regras de força da senha, atualizando conforme o usuário digita.

## Exemplo

![Exemplo](https://i.picasion.com/pic90/7496f8895df49b059bd3e9922427453c.gif)

## Instalação

```bash
npm install --save react-senha-checklist
```

ou com Yarn:

```bash
yarn add react-senha-checklist
```

> **Nota:** O React é uma dependência peer. Use este pacote dentro de um projeto React.

## Uso básico

```jsx
import React, { useState } from "react";
import ReactPasswordChecklist from "react-senha-checklist";

const SignUp = () => {
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  return (
    <form>
      <label htmlFor="password">Senha:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label htmlFor="passwordAgain">Repetir senha:</label>
      <input
        id="passwordAgain"
        type="password"
        value={passwordAgain}
        onChange={(e) => setPasswordAgain(e.target.value)}
      />

      <ReactPasswordChecklist
        rules={["length", "specialChar", "number", "capital", "match"]}
        minLength={8}
        value={password}
        valueAgain={passwordAgain}
        onChange={(isValid) => console.log("Senha válida:", isValid)}
      />
    </form>
  );
};
```

## Regras disponíveis

Escolha as regras na ordem em que deseja exibi-las.

| Regra | Descrição |
|-------|-----------|
| **length** | Válida se a senha atinge o comprimento mínimo. Requer a prop `minLength`. |
| **specialChar** | Válida se a senha contém pelo menos um caractere especial (não alfanumérico). |
| **number** | Válida se a senha contém pelo menos um número. |
| **capital** | Válida se a senha contém pelo menos uma letra maiúscula. |
| **match** | Válida se a senha é igual à confirmação. Requer a prop `valueAgain`. |
| **equalNumber** | Válida se a senha **não** contém 3 caracteres iguais em sequência (ex.: `aaaa`). |

## Props

| Prop | Descrição | Tipo | Obrigatória | Padrão |
|------|-----------|------|-------------|--------|
| **rules** | Regras a exibir, na ordem desejada. Valores: `length`, `specialChar`, `number`, `capital`, `match`, `equalNumber` | `RuleNames[]` | Sim | — |
| **value** | Valor atual do campo de senha | `string` | Sim | — |
| **minLength** | Comprimento mínimo da senha | `number` | Com regra `length` | — |
| **valueAgain** | Valor atual do campo de confirmação da senha | `string` | Com regra `match` | — |
| **onChange** | Callback chamado quando a senha passa a ser válida ou inválida em todas as regras | `(isValid: boolean) => void` | Não | — |
| **className** | Classe CSS aplicada ao container do componente | `string` | Não | — |
| **style** | Estilos inline no container | `React.CSSProperties` | Não | — |
| **iconSize** | Tamanho do ícone (✔ / ✗) em pixels | `number` | Não | `12` |
| **validColor** | Cor do ícone quando a regra está válida | `string` | Não | `#4BCA81` |
| **invalidColor** | Cor do ícone quando a regra está inválida | `string` | Não | `#FF0033` |

## Classes CSS

- **`.valid`** — Item de regra cumprida
- **`.invalid`** — Item de regra não cumprida

## Desenvolvimento

Para rodar o Storybook localmente:

```bash
npm run storybook
# ou
yarn storybook
```

Acesse [http://localhost:9009](http://localhost:9009).

## Licença

MIT © [Helena Paixão](https://github.com/helenapaixao)
