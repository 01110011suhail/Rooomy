//Get / API / User/

export const getUserData = async (req, res) => {
    try{
        const role = req.user.role;
        const recentSearchCities = req.user.recentSearchCities;
        res.json({success: true, data: role, recentSearchCities});

    }catch(error){
        res.status(500).json({success: false, message: error.message});
    }

}

export const storeRecentSearchedCities = async (req, res) => {
    try{
        const { recentSearchCity } = req.body;
        const user =  req.user;

        if(user.recentSearchCities.length <3){
            user.recentSearchCities.push(recentSearchCity);
        }else{
            user.recentSearchCities.shift();
            user.recentSearchCities.push(recentSearchCity);
        }
        await user.save();
        res.json({success: true, message: "city added"})


    }catch(error){
        res.json({success: false, message: error.message});


    }
}