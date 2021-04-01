import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {FaCheckCircle} from 'react-icons/fa'

interface PasswordProps {
	value: string,
	valueAgain?: string,
	minLength?: number,
	iconSize?: number,
	validColor?: string,
	invalidColor?: string,
	onChange?: (isValid: boolean) => any,
}
export type RuleNames = "length"|"specialChar"|"number"|"capital"|"match"|"equalNumber"

export interface ReactPasswordChecklistProps extends PasswordProps {
	className?: string,
	style?: React.CSSProperties,
	rules: Array<RuleNames>,
}
const ReactPasswordProps:React.FC<ReactPasswordChecklistProps> = ({
	className,
	style,
	rules,
	value,
	valueAgain,
	minLength,
	onChange,
	...remainingProps}) => {
		const [isValid, setIsValid] = useState(false)
		const ruleDefinitions: { [key in RuleNames]: { valid: boolean, message: string } } = {
			length: {
				valid: value.length >= (minLength || 100),
				message: `Devem conter entre ${minLength} e 30 caracteres`,
			},
			specialChar: {
				valid: /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(value),
				message: "Senha com caracteres especiais",
			},
			number: {
				valid: /\d/g.test(value),
				message: "Senha com números",
			},
			capital: {
				valid: (() => {
					var i = 0
					if (value.length === 0){
						return false
					}
					while ( i < value.length){
						const character = value.charAt(i);
						if (character == character.toLowerCase()){
							// Character is lowercase, numeric, or a symbol
						} else if (character == character.toUpperCase()) {
							return true;
						}
						i++;
					}
					return false
				})(),
				message: "A senha tem uma letra maiúscula.",
			},
			match: {
				valid: value.length > 0 && value === valueAgain,
				message: "Senhas iguais",
			},
			
	equalNumber : {
	valid: /^(\d)\1{10}/.test(value),
	message:"Não pode conter 3 caracteres iguais em sequência (ex:aaaa)"
},
		}
		const enabledRules = rules.filter(rule => Boolean(ruleDefinitions[rule]))
		useEffect(() => {
			if(enabledRules.every(rule => ruleDefinitions[rule].valid)){

				setIsValid(true)
			} else {
				setIsValid(false)
			}
		}, [value, valueAgain])
		useEffect(() => {
			if(typeof onChange === "function"){
				onChange(isValid)
			}
		}, [isValid])
		return (
			<UL
				className={className}
				style={style}
			>
				{enabledRules.map(rule => {
					const { message, valid } = ruleDefinitions[rule]
					return (
						<Rule key={rule} valid={valid} {...remainingProps}>{message}</Rule>
					)
				})}
			</UL>
		)
};



interface RuleProps {
	valid: boolean
	iconSize?: number
	validColor?: string
	invalidColor?: string
}
const Rule:React.FC<RuleProps> = ({ valid, iconSize, validColor, invalidColor, children }) => {
	return (
		<LI
			className={valid ? "valid" : "invalid"}
		>


	
		
    {valid ? (
      <FaCheckCircle width={iconSize} height={iconSize} color={validColor} />
    ) : (
			<FaCheckCircle width={iconSize} height={iconSize} color="#666" />
    )}
 


			<span>{children}</span>
		</LI>
	)
}

const UL = styled.ul`
	margin: 0;
	padding: 0;
`



const LI = styled.li`
margin-left:10px;
	list-style-type: none;
	display: flex;
	align-items: center;
	margin: 2px 0;
	& > span {
		padding-top: 2px;
		opacity: ${props => props.className === "valid" ? 1 : 0.5}
	}
`
//const Icon = styled.svg`
////	margin-right: 5px;
//`

ReactPasswordProps.defaultProps = {
	iconSize: 12,
	validColor: "#4BCA81",
	invalidColor: "#FF0033",
}

export default ReactPasswordProps
