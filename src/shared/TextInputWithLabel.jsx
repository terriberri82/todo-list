import styles from "./TextInputWithLabel.module.css";
import styled from "styled-components";

const LabelSyle = styled.label`
padding-right: .30em;
font-size: 1.25em;
`
const InputStyle = styled.input`
margin-right: .50em;
background-color:rgba(199, 238, 214, 1);
`
function TextInputWithLabel ({elementId,
  labelText,
  onChange,
  ref,
  value,
}){
    return(
        <>
          <LabelSyle htmlFor={elementId}>{labelText}</LabelSyle>
          <InputStyle
            type="text"
            id={elementId}
            ref={ref}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        </>
    )
}

export default TextInputWithLabel