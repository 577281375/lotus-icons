import * as React from 'react';
import { render } from 'react-dom';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { LotusIcon } from "../src";

@observer
class AllIconDemo extends React.Component {
    @computed
    get Icons() {
        return (
            <span>
                <LotusIcon />
            </span>
        )
    }

    public render() {
        return (
            <div>{this.Icons}</div>
        )
    }
}


render(<AllIconDemo />, document.getElementById('__react-content'));
