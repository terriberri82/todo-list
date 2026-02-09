function TodosViewForm({sortDirection, setSortDirection, sortField, setSortField, queryString, setQueryString}) {
  
    const preventRefresh = (e) =>{
        e.preventDefault();
    }
  return <form onSubmit={preventRefresh}>
            <>
                <label htmlFor="searchTodos">Search todos:</label>
                <input id="searchTodos"
                type="text"
                value={queryString}
                onChange={(e) => setQueryString(e.target.value)}
                />
                <button type="button" onClick={() => setQueryString("")}>Clear</button>
            </>
            <>
                <label htmlFor="sortBy">Sort by</label>
                <select id='sortBy' onChange={(e) => setSortField(e.target.value)} value={sortField}>
                    <option value="title">Title</option>
                    <option value='createdTime'>Time added</option>
                </select>
                <label htmlFor='direction'>Direction</label>
                <select id='direction'onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </>
        </form>;
};

export default TodosViewForm