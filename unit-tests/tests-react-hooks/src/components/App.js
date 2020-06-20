import React, {useState} from 'react';
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import TextInput from "../testing-useEffect/TextInput";

function App() {
    const [value, setValue] = useState('')
    const data = () => {
        return {
            value: 'hh',
            focusedByDefault: true,
            onChange(v) {
                return this.value = v
            }
        }
    }

    return (
        <div>
            <TextInput
                focusedByDefault
                onChange={setValue}
                value={value}
                data={data}
            >
                <p>hi</p>
            </TextInput>

            <CommentBox/>
            <CommentList/>
        </div>
    );
}

export default App
