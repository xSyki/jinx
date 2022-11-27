import { KeyboardTypeOptions } from 'react-native'

import styled from 'styled-components/native'

interface IStyledTextInput {
  placeholder: string
  keyboardType?: KeyboardTypeOptions
  value: string
  onChangeText: (string: string) => void
}

function StyledTextInput(props: IStyledTextInput) {
  const { placeholder, keyboardType, value, onChangeText } = props

  return (
    <TextInputWrapper
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  )
}

export default StyledTextInput

const TextInputWrapper = styled.TextInput`
  font-family: LuckiestGuy;
  color: ${(props) => props.theme.text.default};
  font-size: 20px;
  flex-grow: 1;
`
