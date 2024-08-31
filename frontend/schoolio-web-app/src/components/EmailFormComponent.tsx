import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'


export const EmailFormComponent = () => {

    const submit = () => {
        try {
            axios.post("https://github.com/philipAthanasopoulos/Papagalos-Drive/issues",
                {
                    title: "test issue",
                    body:"test"
                }
            )
        } catch (error) {
            console.log(error);
            
        }
    }


  return (
    <Button variant='primary' onClick={() => submit()} >Create issue</Button>
  )
}