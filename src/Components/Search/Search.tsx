import React from 'react';
import './index.sass'
import {ReactComponent as SearchSvg} from '../../images/decor/search.svg'

const Search = () => {
    const formEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // TODO
        // ref on input
        // if ref.value clear, need ref focus
        // else need SEARCH
    }

    return (
        <form className={'header__search'} onSubmit={formEvent}>
            <button className={'header__btn-search'}>
                <SearchSvg />
            </button>
            <input type={'text'} className={'header__search-input'} />
        </form>
    );
};

export default Search;