import * as React from 'react';
import { AbstractNode, IconDefinition } from './types';
import { generate, isIconDefinition, log, MiniMap, withSuffix} from '../utils';
// import Children from './json';


export interface IconProps {
    type: string | IconDefinition;
    className?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
    style?: React.CSSProperties;
    primaryColor?: string;
    secondaryColor?: string;
}

class Icon extends React.Component<IconProps>{
    static definitions = new MiniMap<IconDefinition>();
    //输出数据
    static get(key: string): IconDefinition{
        return this.definitions.get(key);
    }
    //注入数据
    static add(...icons: IconDefinition[]) {
        icons.forEach(icon => {
            const key = withSuffix(icon.name, icon.theme);
            this.definitions.set(key, icon);
        })
    }

    public render() {
        const {
            type,
            style = { width: '100px', height: '100px', fontSize: "24px" },
            ...rest
        } = this.props;
        let target: IconDefinition | undefined;
        if (isIconDefinition(type)) {
            target = type;
        } else if (typeof type === 'string') {
            target = Icon.get(type)
        };
        if (!target) {
            log(`type should be string or icon definition,bug got ${type}`);
            return null;
        }
        const AbstractNodes = generate(
            target.icon,
            `svg-${target.name}`,
            {
                style,
                ...rest
            },
        )
        return (
            <div className="demo">
                {AbstractNodes}
            </div>
        )
    }
}

export default Icon;