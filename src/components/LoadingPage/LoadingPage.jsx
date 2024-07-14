import React from 'react'
import { Grid } from 'react-loader-spinner'

export default function LoadingPage() {
return (
    <>
    <div className='d-flex justify-content-center pt-5  vh-100'>
    <Grid
  visible={true}
  height="80"
  width="80"
  color="#0B5ED7"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
        
    </>
)
}
