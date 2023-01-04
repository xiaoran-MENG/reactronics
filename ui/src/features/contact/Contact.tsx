import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { Counter, up, down } from './DemoReducer';

const Contact = () => {

  const dispatch = useDispatch()
  const { val } = useSelector((s: Counter) => s)

  return <>
    <Typography>{val}</Typography>
    <ButtonGroup>
      <Button onClick={() => dispatch(up(2))} variant='contained'>Up</Button>
      <Button onClick={() => dispatch(down(2))} variant='contained'>Down</Button>
    </ButtonGroup>
  </>
}

export default Contact
