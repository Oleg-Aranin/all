import React from "react";
import {connect} from "react-redux";
import {cancel, search} from "../reducers/beersActions";
import {BeersList} from "./BeersList";
import {setConfig} from "../reducers/configActions";

export function Beers({data, messages, status, search, cancel, config, setConfig}) {
    return (
        <>
            <div className="App-input">

                <select
                    name="per-page"
                    defaultValue={config.perPage}
                    onChange={e => setConfig({perPage: Number(e.target.value)})}
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
                        return <option key={value} value={value}>
                            {value} results
                        </option>
                    })}
                </select>

                <input type="text"
                       placeholder='Search beers'
                       onChange={e => search(e.target.value)}
                />

                {status === 'pending' && (
                    <>
                        <button type={'button'} onClick={cancel}>Cancel</button>
                        <span className="App-spinner">
                          Loading...
                       </span>
                    </>
                )}
            </div>
            {status === 'success' && (
                <div className="App-content">
                    <BeersList beers={data}/>
                </div>
            )}
            {status === 'failure' && (
                <div className="App-content">
                    <p>Oops! {messages[0].text}</p>
                </div>
            )}
        </>
    )
}

function mapState(state) {
    return {
        ...state.beers,
        config: state.config,
    }
}

export default connect(mapState, {search, cancel, setConfig})(Beers)
