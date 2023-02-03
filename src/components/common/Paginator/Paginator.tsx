import { FC, useEffect, useState } from "react";
import style from "./Paginator.module.css";

type PropsType = {
    onPageChange: (currentPage: number) => void,
    currentPage: number,
    totalItems: number,
    pageSize: number,
    portionSize?: number
}

const Paginator: FC<PropsType> = ({ onPageChange, currentPage, totalItems, pageSize, portionSize = 10 }) => {

    const numOfPages = Math.ceil(totalItems / pageSize);

    const [currentPortion, setCurrentPortion] = useState(1);

    const numOfPortions = numOfPages / portionSize;

    useEffect((): void => {
        const portion = Math.ceil(currentPage / portionSize);
        setCurrentPortion(portion >= numOfPortions ? numOfPortions: portion);
    }, [currentPage, portionSize, numOfPortions]);

    const buttons: Array<number> = [];

    const from = portionSize * currentPortion - portionSize + 1;

    const to = portionSize * currentPortion;

    for (let i = from; i <= to; i++) {
        buttons.push(i);
    }

    return (
        <div className={style.pages}>
            <button disabled={from <= 1} onClick={() => { setCurrentPortion(1) }}>{"<<"}</button>
            <button disabled={from <= 1} onClick={() => { setCurrentPortion(currentPortion - 1 < 1 ? 1 : currentPortion - 1) }}>{"<"}</button>
            {
                buttons.map(page => {
                    return (
                        <span key={page} onClick={() => onPageChange(page)} className={(currentPage === page ? style.selected : undefined) + " " + style.page}>{page}</span>
                    );
                })
            }
            <button disabled={to >= numOfPages} onClick={() => { setCurrentPortion(currentPortion + 1 > numOfPortions ? numOfPortions: currentPortion + 1)}}>{">"}</button>
            <button disabled={to >= numOfPages} onClick={() => { setCurrentPortion(numOfPortions)}}>{">>"}</button>
        </div>
    );
};

export default Paginator;