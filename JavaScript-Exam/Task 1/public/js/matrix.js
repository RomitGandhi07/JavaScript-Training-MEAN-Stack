function mapdata() {

  let nodes = [];
  let edges = [];

  // Write your logic here...
  
  // here number will be used to generate number*number matrix
  const number=3;

  // This function is responsible to make nodes with given format
  const makeNode=(row,column)=>{
    return {data: {
      id: String("N"+row+"-"+column)
    }}
  };

  // This function is responsible for generating source using target row,column & direction
  const generateSource=({row,column,direction})=>{
    if(direction=="E"){
      return row+"-"+(column-1);
    }
    else if(direction=="W"){
      return row+"-"+(column+1);
    }
    else if(direction=="N"){
      return (row+1)+"-"+column;
    }
    else if(direction=="S"){
      return (row-1)+"-"+column;
    }
  };

  // This function is responsible for generating edge as per given format
  const makeEdge=({row,column,direction})=>{
    // Generating source and target
    const source=generateSource({row,column,direction});
    const target=row+"-"+column;

    // Return edge with specified format
    return {data: {
                id: source+direction,
                source: "N"+source,
                target: "N"+target
                }
            };
  };

  // This function is responsible for check edge is valid or not
  const checkValidEdge=(row,column)=>{
    //If row number is -1 or greater equal to number then return false otherwise true
    if(row==-1 || column==-1 || row>=number || column>=number){
      return false;
    }
    return true;
  }

  // This function is responsible for adding the edge in the edges array
  const addEdge=(row,column,direction)=>{ 
    if(!checkValidEdge(row,column)){return ;}
    edges.push(makeEdge({row,column,direction}));
  };

  // This function is responsible for adding the edges from the node(in all directions)
  const addEdgesForNode=(row,column)=>{
      addEdge(row,column+1,"E");
      addEdge(row,column-1,"W");
      addEdge(row+1,column,"S");
      addEdge(row-1,column,"N");
  }

  // Geneating nodes and edges
  for(let row=0;row<number;++row){
    for(let column=0;column<number;++column){
      nodes.push(makeNode(row,column));
      addEdgesForNode(row,column);
    }
  }

  elements = {
    nodes,
    edges
  };

  return elements;

}
module.exports.mapdata = mapdata;


