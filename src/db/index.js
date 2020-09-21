const db = require('./new.json')



fs = require('fs');
const s = () => {
    let newObj = []
    let newArr = []
    db.map(x => {
        newArr.push(x.district)
        return newArr

    })
    let x = [...new Set(newArr)]
    for (let i = 0; i <= x.length - 1; i++) {
        newObj.push({
            [x[i]]: (
                db.filter(({ district }) => {
                    if (district === x[i]) {
                        return {
                            district
                        }
                    }
                }
                ).map(({ id, name }) => ({
                    id,
                    name
                }))
            )
        })
    }


    console.log(newObj)



//    fs.writeFile('locations_3.json', JSON.stringify(newObj), (err) => {
  //      if (err) throw err;
  //      console.log('The file has been saved!');
 //   });

}






//console.log(newObj)


//  fs.writeFile('new.json', JSON.stringify(newObj), (err) => {
//    if (err) throw err;
//     console.log('The file has been saved!');
//   });



s()
console.log(db.length)