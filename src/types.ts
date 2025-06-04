export interface StarRatingData {
    attribute: string;
    rating: number;
    rawText: string;
    startPos: number;
    endPos: number;
    element?: HTMLElement;
}

export interface StarRatingConfig {
    maxStars: number;
    filledIcon: string;
    emptyIcon: string;
    showValue: boolean;
}

export interface MetadataEntry {
    attribute: string;
    value: number;
    line: number;
    text: string;
}

export enum StarState {
    EMPTY = 0,
    FILLED = 1,
    HOVER = 2
}