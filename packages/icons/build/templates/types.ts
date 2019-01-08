export interface AbstractNode{
    tag: string;
    attrs: {
        [key: string]: string;
    };
    children?: AbstractNode[]
}

export type ThemeType = 'fill' | 'outline' | 'twoone';

export interface IconDefinition{
    name: string;
    theme: ThemeType;
    // icon:
    // \
}