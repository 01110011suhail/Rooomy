export const getUserData = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        role: req.user.role,
        recentSearchCities: req.user.recentSearchCities,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = req.user;

    if (user.recentSearchCities.length < 3) {
      user.recentSearchCities.push(recentSearchCity);
    } else {
      user.recentSearchCities.shift();
      user.recentSearchCities.push(recentSearchCity);
    }

    await user.save();

    res.json({ success: true, message: "City added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};