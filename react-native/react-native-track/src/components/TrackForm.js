import React, {useContext} from 'react'
import {Input, Button} from 'react-native-elements'
import Spacer from "./Spacer";
import {Context} from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

export default () => {
    const {
        state: {name, recording, locations},
        startRecording,
        stopRecording,
        changeName
    } = useContext(Context)
    const [saveTrack] = useSaveTrack()

    return (
        <>
            <Spacer>
                <Input
                    onChangeText={changeName}
                    placeholder='Enter name'
                    value={name}
                />
            </Spacer>
            <Spacer>
                {recording
                    ? <Button title='Stop' onPress={stopRecording}/>
                    : <Button title='Start Recording' onPress={startRecording}/>
                }
            </Spacer>

            <Spacer>
                {
                    !recording && locations.length
                        ? <Button title='Save Recording' onPress={saveTrack}/>
                        : null
                }
            </Spacer>
        </>
    )
}

