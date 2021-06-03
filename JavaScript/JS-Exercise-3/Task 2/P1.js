const sportsData = [{
    Name: 'Ravindra',
    Sports: ['Chess', 'Cricket'],
},
{
    Name: 'Ravi',
    Sports: ['Cricket', 'Football'],
},
{
    Name: 'Rishabh',
    Sports: ['Table-Tennis', 'Football'],
}];

let findSportsGroups = (sportsData) => {
    //Iterate over every element of sports data
    const sportsGroups = sportsData.reduce((sportsGroups, cur) => {
        let name = cur.Name;
        let sports = cur.Sports;
        //Iterate over every sport of the person
        sports.forEach(sport => {
            //Check if sport is there in the map or not and if it isn't and add it with the value of empty array
            if (!sportsGroups.has(sport)) {
                sportsGroups.set(sport, []);
            }
            //add person's name to the list of sport
            sportsGroups.get(sport).push(name);
        });
        return sportsGroups;
    }, new Map());

    //Make array of objects from map
    const ans = Array.from(sportsGroups, item => ({ [item[0]]: item[1] }));

    return ans;
};
console.log(findSportsGroups(sportsData));