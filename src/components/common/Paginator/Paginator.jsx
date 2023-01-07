import style from "./Paginator.module.css";

function Paginator({onPageChange, currentPage, totalUsers, pageSize}) {

    const numOfPages = Math.ceil(totalUsers / pageSize);

    const buttons = [];

    for (let i = 1; i <= numOfPages; i++) {
        buttons.push(i);
    }

    return (
        <>
            {
                buttons.map(page => {
                    return (
                        <span key={page} onClick={() => onPageChange(page)} className={currentPage === page ? style.selected : undefined}>{page}</span>
                    );
                })
            }
        </>
    );
}

export default Paginator;