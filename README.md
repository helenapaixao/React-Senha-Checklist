# React Senha Checklist


[![NPM](https://nodei.co/npm/react-senha-checklist.png?compact=true)](https://nodei.co/npm/react-senha-checklist/)

[![npm version](https://badge.fury.io/js/react-senha-checklist.svg)](https://badge.fury.io/js/react-senha-checklist) ![NPM License](https://img.shields.io/npm/l/react-senha-checklist) 

Um componente React para exibir o sucesso ou a falha das regras de força da senha que são atualizadas conforme o usuário digita.

## Example
![Exemplo](https://i.picasion.com/pic90/7496f8895df49b059bd3e9922427453c.gif)


## Install in your project

`npm install --save react-senha-checklist`

`yarn add react-senha-checklist`

_Note: react is a peer dependency. You should be using this in a React project._

## Example Usage

```
import React, {useState} from "react"
import PasswordChecklist from "react-senha-checklist"

const SignUp = () => {
	const [password, setPassword] = useState("")
	const [passwordAgain, setPasswordAgain] = useState("")
	return (
		<form>
			<label>Password:</label>
			<input type="password" onChange={e => setPassword(e.target.value)}>
			<label>Password Again:</label>
			<input type="password" onChange={e => setPasswordAgain(e.target.value)}>

			<PasswordChecklist
				rules={["length","specialChar","number","capital","match"]}
				minLength={5}
				value={password}
				valueAgain={passwordAgain}
				onChange={(isValid) => {}}
			/>
		</form>
	)
}
```



## Available Rules

Customize the component to display only the rules you need in the desired order you wish to display them.

#### length
Valid if the password meets the minimum length. Requires `minLength` prop to be included.

#### specialChar

Valid if the password contains a special character from `~!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?`.

#### number

Valid if the password contains a number.

#### capital

Valid if the password contains a capital letter.

#### match

Valid if the password matches the confirm password valud. Requires `valueAgain` prop to be included.


## Props

| Prop  | Description  | Type  | Required  | Default  |
|---|---|---|---|---|
|  rules | Rules to display in the order desired.<br />Options are `length`, `specialChar`,<br />`number`, `capital`, `match`  | array  | yes |
|  value | Current potential password  | string  | yes |
|  minLength | Minimum Password Length  | number  | Only with<br />`length` rule |
|  valueAgain | Current potential password confirmation  | string  | Only with<br />`match` rule |
|  onChange | Callback that is triggered when the<br />password becomes valid or invalid across<br />all rules. | function  |  | `(isValid) => {}`
|  className | Class applied to the entire component  | string  |  |
|  style | Inline styles applied to the<br />outer component wrapper  | object  |  |
|  iconSize | Size of ✔ or 𐄂 icon  | number  |  | `18` |
|  validColor | Color of checkmark icon  | string  |  | `#4BCA81` |
|  invalidColor | Color of X icon  | string  |  | `#FF0033` |

## Available Classes
* `.valid` - Valid Message
* `.invalid` - Invalid Message

## Run Locally

`npm run storybook`

`yarn storybook`
