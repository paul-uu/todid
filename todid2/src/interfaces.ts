
export interface IToDid {
    // exisiting model:
    date: string;
    time: string;
    date_time: number;
    day: string;
    stuff: string;
    thoughts: string;
    food: string;

    // new
    starred: boolean;
    tags: string[];
}

export interface IOption {
    value: string;
    label: string;
}