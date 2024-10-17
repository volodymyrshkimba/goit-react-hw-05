const MoviesSearchForm = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.search.value.trim();
    if (value === "") {
      return;
    }
    onSearch(value);
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="search" />
      <button type="submit">Search</button>
    </form>
  );
};

export default MoviesSearchForm;
