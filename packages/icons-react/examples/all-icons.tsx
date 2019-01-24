import * as React from 'react';
import { render } from 'react-dom';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { LotusIcon } from "../src";
import { IconDefinition } from '../src/components/types';
import Children from './data';

const Container = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 80vw;
    margin: auto;
`;
// background: ${props => props.primary ? "palevioletred" : "white"};
// color: ${props => props.primary ? "white" : "palevioletred"};

const Target:{[key:string]: IconDefinition} = {
    ['account-book']: {
        icon: {
            tag: 'svg',
            attrs: { viewBox: "64 64 896 896" },
            Children: Children
        },
        name: 'buycar',
        theme: 'fill',
    }
};
LotusIcon.add(...Object.keys(Target).map(key => Target[key]));

@observer
class AllIconDemo extends React.Component {
    @computed
    get Icons() {
        return (
            <span>
                <LotusIcon type={'buycar'}/>
            </span>
        )
    }

    public render() {
        return (
            <div style={{ color: '#555' }}>
                <h1 style={{ textAlign: 'center' }}>All Icons</h1>
                <div style={{ textAlign: 'center' }}>
                    <Container primary>
                        <div>{this.Icons}</div>
                    </Container>
                </div>
            </div>
        )
    }
}


render(<AllIconDemo />, document.getElementById('__react-content'));
