import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string,
    containerStyles?: string,
    btnType?: "button" | "submit"
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean
}

export interface SearchManufacturerProps {
    selected: string,
    setSelected: (selected: string) => void;
}

export interface SearchSearchBarProps {
    setManufacturer: (searchManufacturer: string) => void;
    setModel: (searchModel: string) => void;

}

export interface CarProps {
    city_mpg: number,
    class: string,
    combination_mpg: number,
    cylinders: number,
    displacement: number,
    drive: string,
    fuel_type: string,
    highway_mpg: number,
    make: string,
    model: string,
    transmission: string,
    year: number,
}

export interface FilterProps {
    pageNumber: number;
    manufacturer: string,
    year: number,
    fuel: string,
    limit: number,
    model: string,
}

export interface optionProps {
    title: string,
    options: string
}

export interface CustomFilterProps {
    title: string;
    options: optionProps[];
    setFilter: (filter: string | number) => void
}

export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: (Limit: number) => void

}