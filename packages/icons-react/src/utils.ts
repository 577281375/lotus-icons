import { AbstractNode, IconDefinition } from './components/types';
import * as React from 'react';

export interface Attrs {
    [key: string]: string;
};

export function normalizeAttrs(attrs: Attrs = {}): Attrs {
    return Object.keys(attrs).reduce((target: Attrs, key) => {
        var val = attrs[key];
        if (key === 'class') {
            attrs['className'] = val;
            delete attrs.class;
        } else {
            target[key] = val;
        }
        return target;
    }, {})
};
/**
//principle:

通过  add接口 注入 数据data
通过  get接口 根据type 获取 data[type]
data[type] 通过generate render 以下dom
<svg>
    <path  d='' />
    <path  d='' />
    <path  d='' />
</svg>
*/


export function generate(
    node: AbstractNode,
    key: string,
    rootProps?: { [key: string]: any } | false
): any {
    if (!rootProps) {
        return React.createElement(
            node.tag,
            { key, ...normalizeAttrs(node.attrs) },
            (node.Children || []).map((child, index) => {
                return generate(child, `${key}-${node.tag}-${index}`);
            })
        )
    }
    return React.createElement(
        node.tag,
        {
            key,
            ...normalizeAttrs(node.attrs),
            ...rootProps
        },
        (node.Children || []).map((child, index) => {
            return generate(child, `${key}-${node.tag}-${index}`);
        })
    )
};
/**
{
    icon: AbstractNode,
    name: string,
    theme: string,
}
*/
export function isIconDefinition(target: any): target is IconDefinition {
    return (
        typeof target === 'object' &&
        typeof target.name === 'string' &&
        typeof target.theme === 'string' &&
        (typeof target.icon === 'object' || typeof target.icon === 'function')
    );
};

export function log(message:string):void {
    if (!(process && process.env && process.env.NODE_ENV=== 'production')) {
        console.error(`[@lotus-icons/icons-react]:${message}`);
    }
}

export class MiniMap<V> {
    get size() {
        return Object.keys(this.collection).length;
    }
    private collection: { [key: string]: V } = {};
    clear(): void {
        this.collection = {};
    }
    delete(key: string): boolean {
        return delete this.collection[key];
    }
    get(key: string): V{
        return this.collection[key];
    }
    has(key: string): boolean {
        return Boolean(this.collection[key]);
    }
    set(key: string, value: V): this {
        this.collection[key] = value;
        return this;
    }
}
//TO Do :theme类型定义 select 还未完结
export function withSuffix(name: string, theme: string): string{
    // console.log(name, theme);
    return name;
}