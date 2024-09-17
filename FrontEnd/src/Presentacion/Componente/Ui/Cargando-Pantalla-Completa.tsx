import React from 'react'
import { Layout, Spinner } from '@ui-kitten/components'

export const CargandoPantallaCompleta = () => {
  return (
    <Layout style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <Spinner
            size='giant'
        />
    </Layout>
  )
}

