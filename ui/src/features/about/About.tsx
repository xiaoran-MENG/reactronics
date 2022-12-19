import { Button, ButtonGroup, Typography } from '@mui/material'
import { Container } from '@mui/system'
import api from './../../app/api/index';

const About = () => {
  return <Container>
    <Typography gutterBottom variant='h2'>Test</Typography>
    <ButtonGroup fullWidth>
      <Button variant='contained' onClick={() => api.errors.badRequest().catch(e => console.log(e))}>400</Button>
      <Button variant='contained' onClick={() => api.errors.unauthorized().catch(e => console.log(e))}>401</Button>
      <Button variant='contained' onClick={() => api.errors.notFound().catch(e => console.log(e))}>404</Button>
      <Button variant='contained' onClick={() => api.errors.serverError().catch(e => console.log(e))}>500</Button>
      <Button variant='contained' onClick={() => api.errors.invalid().catch(e => console.log(e))}>Invalid</Button>
    </ButtonGroup>
  </Container>
}

export default About
