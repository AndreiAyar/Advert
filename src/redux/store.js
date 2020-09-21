import { createStore } from "redux";

const initialState = {
  checked: false,
  optionChecked:[],
  
};

const checkHandler = (id, state=initialState) => {
    let checkedArr = []
    checkedArr.find(id => console.log(id))
    checkedArr.push(id);

    return {
        ...state,
        optionChecked:12,//tests for implementation
    }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK":
      return {
        ...state,
        checked: !state.checked ? true : false,
        optionChecked:checkHandler(action.id)
      };
    case "DEC":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
};
const store = createStore(reducer);

export default store;


//const [optionCheck, setOptionCheck] = useState(false)
//const [checked, setChecked] = useState(false)
//console.log(props)
//const handleCheck = (id) => {
//  setChecked(!first ? true : false)
////  console.log(optionCheck)
 // setOptionCheck(id) 
 
//}
