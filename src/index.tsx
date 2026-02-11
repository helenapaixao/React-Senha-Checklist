import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { FaCheckCircle } from 'react-icons/fa'

interface PasswordProps {
  value: string
  valueAgain?: string
  minLength?: number
  iconSize?: number
  validColor?: string
  invalidColor?: string
  onChange?: (isValid: boolean) => void
}

export type RuleNames =
  | 'length'
  | 'specialChar'
  | 'number'
  | 'capital'
  | 'match'
  | 'equalNumber'

export interface ReactPasswordChecklistProps extends PasswordProps {
  className?: string
  style?: React.CSSProperties
  rules: RuleNames[]
}

const ReactPasswordChecklist: React.FC<ReactPasswordChecklistProps> = ({
  className,
  style,
  rules,
  value,
  valueAgain = '',
  minLength,
  onChange,
  ...remainingProps
}) => {
  const [isValid, setIsValid] = useState(false)

  const ruleDefinitions = useMemo(() => {
    const min = minLength ?? 0
    return {
      length: {
        valid: value.length >= min,
        message: `Mínimo de ${min} caracteres`
      },
      specialChar: {
        valid: /[^a-zA-Z0-9]/.test(value),
        message: 'Senha com caracteres especiais'
      },
      number: {
        valid: /\d/.test(value),
        message: 'Senha com números'
      },
      capital: {
        valid: /[A-Z]/.test(value),
        message: 'A senha tem uma letra maiúscula'
      },
      match: {
        valid: value.length > 0 && value === valueAgain,
        message: 'Senhas iguais'
      },
      equalNumber: {
        valid: !/(.)\1{2}/.test(value),
        message: 'Não pode conter 3 caracteres iguais em sequência (ex: aaaa)'
      }
    } as const
  }, [value, valueAgain, minLength])

  const enabledRules = useMemo(
    () => rules.filter((rule) => rule in ruleDefinitions),
    [rules, ruleDefinitions]
  )

  useEffect(() => {
    const allValid = enabledRules.every((rule) => ruleDefinitions[rule].valid)
    setIsValid(allValid)
  }, [enabledRules, ruleDefinitions])

  useEffect(() => {
    onChange?.(isValid)
  }, [isValid, onChange])

  return (
    <UL className={className} style={style} role="list">
      {enabledRules.map((rule) => {
        const { message, valid } = ruleDefinitions[rule]
        return (
          <Rule key={rule} valid={valid} {...remainingProps}>
            {message}
          </Rule>
        )
      })}
    </UL>
  )
}

interface RuleProps {
  valid: boolean
  iconSize?: number
  validColor?: string
  invalidColor?: string
}
const Rule: React.FC<RuleProps> = ({
  valid,
  iconSize = 12,
  validColor = '#4BCA81',
  invalidColor = '#FF0033',
  children
}) => (
  <LI className={valid ? 'valid' : 'invalid'} role="listitem">
    <FaCheckCircle
      size={iconSize}
      color={valid ? validColor : invalidColor}
      aria-hidden
    />
    <span>{children}</span>
  </LI>
)

const UL = styled.ul`
  margin: 0;
  padding: 0;
`

const LI = styled.li<{ className?: string }>`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0 4px 10px;

  & > span {
    opacity: ${(props) => (props.className === 'valid' ? 1 : 0.6)};
  }
`

ReactPasswordChecklist.defaultProps = {
  iconSize: 12,
  validColor: '#4BCA81',
  invalidColor: '#FF0033'
}

export default ReactPasswordChecklist
