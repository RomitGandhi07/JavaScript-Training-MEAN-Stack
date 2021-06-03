/*
    This middleware is responsible for preventing the basic XSS attack
    Here we replaces < with &lt; ,  > with $gt; , " with &quot;
*/

const encode = (s) => {
    return s.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


const addXSSSecurity = (req, res, next) => {
    try {
        // If body is there then remove HTML like syntax
        if (req.body) {
            // console.log(Object.Entries(req.body)); //This line is for checking code error
            for (let key in req.body) {
                const val = req.body[key];
                if (typeof (val) === "string") {
                    req.body[key] = encode(val);
                }
            }
        }
        next();

    }
    catch (err) {
        next(err);
    }

}

module.exports = addXSSSecurity;