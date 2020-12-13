import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';

const style = {
  backgroundColor: "#ddd",
  border: '1px solid #eee',
  marginBottom: '10px',
  padding: '10px 15px',
  borderRadius: '4px',
  width: 'calc(100% - 30px)',
}

const spanStyle = {
  color: '#777',
  fontSize: '10px',
  fontWeight: 900,
  textTransform: 'uppercase',
} as React.CSSProperties

interface IInputProps {
  placeholder?: string,
  label: string
}
const Input: React.FunctionComponent<WrappedFieldProps & IInputProps> = props => { 
  const { label } = props
  return (
    <div>
      <span style={spanStyle}>{label}</span>
      <input {...props} {...props.input} style={style} />
    </div>
  )
}

export default Input