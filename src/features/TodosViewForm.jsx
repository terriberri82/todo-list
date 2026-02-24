import {useState, useEffect} from 'react';
import styles from "./TodosViewForm.module.css";
import styled from "styled-components";
const SearchInputStyle = styled.input`
background-color:rgba(199, 238, 214, 1);
`
const SelectStyle = styled.select`
background-color:rgba(199, 238, 214, 1);
`

function TodosViewForm({sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString}) {
    const preventRefresh = (e) =>{
        e.preventDefault();
    }

    const [localQueryString, setLocalQueryString] = useState(queryString);
    useEffect(() => {
     const debounce = setTimeout(()=>{
        setQueryString(localQueryString)
     },500);
     return () => clearTimeout(debounce)
    }, [localQueryString, setQueryString]);

  return <form className={styles.todosViewForm} onSubmit={preventRefresh}>
            <>
                <label htmlFor="searchTodos">Search todos:</label>
                <SearchInputStyle id="searchTodos"
                type="text"
                value={localQueryString}
                onChange={(e) => setLocalQueryString(e.target.value)}
                />
                <button className={styles.clearButton}
                type="button" onClick={() => setLocalQueryString("")}>Clear</button>
            </>
            <>
                <label htmlFor="sortBy">Sort by</label>
                <SelectStyle id='sortBy' onChange={(e) => setSortField(e.target.value)} value={sortField}>
                    <option value="title">Title</option>
                    <option value='createdTime'>Time added</option>
                </SelectStyle>
                <label htmlFor='direction'>Direction</label>
                <SelectStyle id='direction'onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </SelectStyle>
            </>
        </form>;
};

export default TodosViewForm