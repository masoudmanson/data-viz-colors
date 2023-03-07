import { styled } from "@mui/material";

export const StyledForm = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  button {
    margin-bottom: 15px;
    width: 100%;
  }
`;

export const StyledLabel = styled("span")`
  font-family: Open Sans;
  font-size: 14px;
  margin-bottom: 4px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

export const FormControl = styled("div")`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
