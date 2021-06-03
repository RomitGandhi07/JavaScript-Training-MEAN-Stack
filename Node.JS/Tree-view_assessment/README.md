DB Structure
------------
One collection will be there called Tags

In that collection every tag will be saved individually

Document structure
------------------
Every document in the collection called Tags will have this structure

_id,
name,
parent_id,
children: [{
    _id,
    name
}]


Here children array is containing objects and it contains direct children of that node

Here, I have used Hybrid approach of modeling relations means storing only id and name of children

Note
----
1. node index.js to run the file

2. On the clicking on move dropdown will be displayed and it only contains tags which are valid to move means suppose I want to move A and inside that it contains B,C,D and parent of that node is Demo so, Demo and B,C,D will not be displayed in the dropdown.
