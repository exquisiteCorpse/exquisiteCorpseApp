import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, View, Image, TouchableHighlight } from 'react-native'
import styles from '../Style/UserEdgeStyles'
import {connect} from 'react-redux'
import { fetchAssignments, fetchCorpses, getUserLoggedIn } from '../../store'
import { imageUrl } from '../../store/url'

/* -----------------    COMPONENT     ------------------ */

class UserEdges extends Component {
  componentDidMount () {
    this.props.fetchData()
  }

  render () {
    const { assignments, corpses, dbUser } = this.props
    const navigate = this.props.navigation.navigate
    let cell = ''
    if (!(assignments.length && corpses.length)) { return <Text /> }
    return (
      <ScrollView>
        <View style={styles.container}>
          {
            assignments
            .filter(assignment => assignment.assigneeId === dbUser.id && assignment.complete === false)
            .map(assignment => {
              if (assignment.cell === 'middle') {
                cell = 'top'
              }
              if (assignment.cell === 'bottom') {
                cell = 'middle'
              }

              const corpse = corpses.find((corpse) => {
                return corpse.id === assignment.corpseId
              })
              if (!corpse) { console.log('HTYTHTUTH', assignment.corpseId) }
              return (
                <View key={assignment.id} style={styles.edge}>
                  <View style={styles.imageEdgeTop}>
                    <Text style={styles.titleCorpse}>{corpse.title}</Text>
                    <Text style={styles.textCorpse}>{corpse.photos.map((photo) => { return photo.user.username }).join('|')}</Text>
                  </View>
                  <View style={styles.viewEdge}>
                    <TouchableHighlight style={styles.touch} onPress={() => { navigate('EdgeCameraScreen', { assignment: assignment, cell: cell }) }}>
                      <Image
                        style={styles.viewEdge}
                        source={{uri: `${imageUrl}${assignment.corpseId}-${assignment.assignorId}-${cell}-edge.jpeg`}}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = (state) => {
  return {
    assignments: state.assignments,
    corpses: state.corpses,
    dbUser: state.dbUser
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => {
    dispatch(getUserLoggedIn())
    dispatch(fetchAssignments())
    dispatch(fetchCorpses())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserEdges)
