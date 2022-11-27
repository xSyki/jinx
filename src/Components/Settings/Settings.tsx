import { useState } from 'react'
import { SafeAreaView } from 'react-native'

import Checkbox from 'expo-checkbox'

import wordsList from '../../../assets/words/words.json'
import { GameStatusEnum, useGameStore } from '../../stores/gameStore'
import { useRoundStore } from '../../stores/roundStore'
import getRandomWords from '../../utils/getRandomWords'
import getRounds from '../../utils/getRounds'
import StyledButton from '../Atoms/StyledButton'
import StyledText from '../Atoms/StyledText'
import StyledTextInput from '../Atoms/StyledTextInput'

function Settings() {
  const [
    { settings, category, players, gameMode },
    { setGameStatus, setSettings },
  ] = useGameStore()
  const [, { setRounds }] = useRoundStore()
  const [numberRounds, setNumberRounds] = useState(settings.rounds)
  const [timer, setTimer] = useState(settings.timer)

  const handleStart = () => {
    if (!category || !gameMode) return

    const words = getRandomWords(
      wordsList.filter((word) => word.categories.includes(category.id)),
      players,
      gameMode,
      numberRounds
    )

    const rounds = getRounds(players, words, gameMode, numberRounds)

    setRounds(rounds)

    setSettings({ timer, rounds: numberRounds })
    setGameStatus(GameStatusEnum.GAME)
  }

  return (
    <SafeAreaView>
      <SafeAreaView>
        <StyledText>Rounds</StyledText>
        <StyledTextInput
          placeholder="name"
          keyboardType="numeric"
          value={String(numberRounds)}
          onChangeText={(rounds) => setNumberRounds(Number(rounds))}
        />
      </SafeAreaView>
      <SafeAreaView>
        <StyledText>Timer</StyledText>
        <Checkbox
          value={timer}
          onValueChange={() => setTimer((timer) => !timer)}
        />
      </SafeAreaView>
      <StyledButton title="Start" onPress={handleStart} />
    </SafeAreaView>
  )
}

export default Settings
