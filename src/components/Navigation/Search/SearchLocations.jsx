import React, { useState, useEffect } from 'react'
import Downshift from 'downshift'
import classes from './Search.module.css';
import locations from '../../../db/locations_3.json';
import { useSelector, useDispatch } from "react-redux";


const SearchLocation = () => {
  let [tagValue, setTagValue] = useState([])
  const items = locations;
  console.log(items)
  let districts = [];
  const initializeData = () => {
    items.map((district, index) => districts.push({ id: index, value: Object.keys(district).toString() }))
  }
  initializeData();

  const Item = (props) => {
    return (
      <div key={props.id} className={tagValue.map(item => item.id).includes(props.id) ? classes.selectItem : props.id === false}>
       <span className={props.item ==='Alba' ? classes.plm : null}> { props.item } </span>
      </div>
    )
  }

  const checkParent = () => {

  
  }

  
  checkParent()
  const selectionHandler = (selectedItem) => {
  }
  const removeValue = (selectedItem) => {
    if (tagValue.map(item => item.id).includes(selectedItem.id)) {
      //console.log('adevarat sefule')
      setTagValue(
        tagValue.filter(i => i.id !== selectedItem.id),
        [...tagValue],
      )
    }
  }

  const changeHandler = (selectedItem) => {
    //console.log(selectedItem)
    setTagValue(
      [...tagValue, { id: selectedItem.id, value: selectedItem.value }]
    )
    removeValue(selectedItem);


  }

  function stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        return {
          ...changes,
          isOpen: state.isOpen,
          inputValue: ''
        }
      case Downshift.stateChangeTypes.mouseUp:
        return {
          isOpen: false,
          inputValue: ''
        }
      default:
        return changes
    }
  }
 let da = true;

  function getLocalitatiFromLocations (location) {
    console.log(location)
    for(let i in items) {
      if (items[i][location]) {
        return items[i][location];
      }
    }

    return [];
  }

  return (

    <Downshift
      stateReducer={stateReducer}
      onChange={changeHandler}
      onSelect={selectionHandler}
      itemToString={item => (item ? item.value : '')}>
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        openMenu,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
          <div>
            <label {...getLabelProps()}>Introduce locatia</label>
            <div
              style={{ displaplay: 'inline-block' }}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <div className={classes.tagWrapper} >{tagValue.map(({ value, id }) => <span index={id} onClick={() => removeValue({ id, value })}>{value + ' x ' + ','}</span>)}
                <input placeholder='Alta locatie?' {...getInputProps({ onFocus: openMenu, inputValue:inputValue})} />
              </div>

            </div>
            <ul {...getMenuProps()}>
              {isOpen
                ? districts
                  .filter(item => !inputValue || item.value.includes(inputValue)) //console.log(item) )//item.district.includes(inputValue))
                  .map((item, index) => (
                    <>
                    <li
                      {...getItemProps({
                        key: item.id,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}
                    >
                      <Item index={index} id={item.id} item={item.value} />
                    </li>
                    {tagValue.find(x => x.id === item.id) && getLocalitatiFromLocations(item.value).map((_item, _index) => {
                      return <li style={{paddingLeft: 20}} {...getItemProps({
                        key: _item.id,
                        index: _index,
                        item: _item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? 'lightgray' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                        },
                      })}> <Item index={_index} id={_item.id} item={_item.name} /></li>
                    })}
                    </>
                 
              
                  ))
                  
                : null}
                 
            </ul>
          </div>
        )}
    </Downshift>
  )

}




export default SearchLocation;