import React from 'react'
import { StyleSheet } from 'react-native'

const Roboto = 'Roboto-Regular'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontFamily: Roboto,
    marginTop: 10
  },
  list: {
    color: 'black',
    fontSize: 15,
    fontFamily: Roboto,
    padding: 5
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    paddingBottom: 20,
    fontFamily: Roboto,
    color: 'black'
  },
  option: {
    width: '100%',
    alignItems: 'center'
  }
})

export default styles
