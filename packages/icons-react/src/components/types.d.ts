export interface AbstractNode{
    tag: string;
    attrs: {
        [key: string]: string;
    },
    Children?: AbstractNode[];
}


export interface IconDefinition{
    icon: AbstractNode,
    name: string,
    theme: string,
}