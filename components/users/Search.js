import { Fragment, useState } from "react/cjs/react.development";



const Search = (props) => {
  const[text, setText] = useState('');
  const[clear, setClear] = useState(false);
  const inputChangeHandler = (event)=>{
    setText(event.target.value);
  };
  const formSubmitHandler = (event)=>{
      event.preventDefault();
      if(!text){
        alert('Please enter a name');
        return;
    }
      props.onSubmit(text);
      setText('');
      setClear(true);
  }
  const removeUserHandler = (event)=>{
      event.preventDefault(); 
      props.onClearUsers();
      setClear(false);
  }
  return (
      <Fragment>

          <form className="form" onSubmit={formSubmitHandler}>
            <input type="text" name="text" placeholder="Search users..." value={text} onChange={inputChangeHandler}/>
            <input type="submit" value="Search" className="btn btn-dark btn-block" />
          </form>
         {clear && <button className="btn btn-light btn-block" onClick={removeUserHandler}>Clear</button>}
      </Fragment>
  );
};

export default Search;
