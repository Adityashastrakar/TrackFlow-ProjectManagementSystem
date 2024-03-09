const { useState, useEffect } = require("react");

function Getrestapi(){

    const[insertdata]=useState([]);
    useEffect(()=>{
        fetch("http://localhost:9000/insertdata")
        .then(resp=>resp.json())
        .then(data=>setemps(data))
    },[])
    return(
         <div>
                <table border={1}>
                {
                    insertdata.map((v)=>{
                        return(
                            <tr>
                                <td>designtion:{v.designation_name}</td>
                                
                            </tr>
                        )

                    })
                }

                </table>
        </div>
    )
       
    

}
export default Getrestapi;