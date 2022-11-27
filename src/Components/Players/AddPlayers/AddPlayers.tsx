import { useEffect, useState } from 'react'
import { TextInput } from 'react-native'

import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import {
  GameModeEnum,
  GameStatusEnum,
  IPlayer,
  useGameStore,
} from '../../../stores/gameStore'
import StyledButton from '../../Atoms/StyledButton'
import StyledText from '../../Atoms/StyledText'

function AddPlayers() {
  const [{ gameMode, players }, { setGameStatus, setPlayers }] = useGameStore()

  const [temporaryPlayers, setTemporaryPlayers] = useState<IPlayer[]>(
    players || []
  )

  useEffect(() => {
    handleAddNewPlayer()
  }, [])

  const handleSubmit = () => {
    setPlayers(temporaryPlayers)
    setGameStatus(GameStatusEnum.CATEGORY)
  }

  const handleAddNewPlayer = () => {
    setTemporaryPlayers((players) => [...players, { id: uuidv4(), name: '' }])
  }

  const editPlayerName = (id: string, name: string) => {
    setTemporaryPlayers((players) => {
      return players.map((player) => {
        if (player.id === id) {
          player.name = name
        }
        return player
      })
    })
  }

  const handleDeletePlayer = (id: string) => {
    setTemporaryPlayers((players) => {
      return players.filter((player) => player.id !== id)
    })
  }

  return (
    <StyledAddPlayers>
      {gameMode === GameModeEnum.EVE && <StyledText>Add player</StyledText>}
      {gameMode === GameModeEnum.TEAMS && <StyledText>Add teams</StyledText>}
      {temporaryPlayers.map((player, index) => (
        <StyledPlayer key={player.id}>
          <StyledText>{index + 1}.</StyledText>
          <TextInput
            placeholder="name"
            value={
              temporaryPlayers.find(
                (playerGeneral) => playerGeneral.id === player.id
              )?.name || ''
            }
            onChangeText={(name) => editPlayerName(player.id, name)}
          />
          <StyledButton
            size="sm"
            title="Delete"
            onPress={() => handleDeletePlayer(player.id)}
          />
        </StyledPlayer>
      ))}
      <StyledButton title="Add new player" onPress={handleAddNewPlayer} />
      <StyledButton title="Submit" onPress={handleSubmit} />
    </StyledAddPlayers>
  )
}

export default AddPlayers

const StyledAddPlayers = styled.SafeAreaView``

const StyledPlayer = styled.SafeAreaView``
