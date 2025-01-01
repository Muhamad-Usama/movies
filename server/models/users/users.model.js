const User = require('./users.mongo');

/**
 * Find a user by email.
 * @param {string} email
 * @returns {Promise<Object>}
 */
async function findUserByEmail(email) {
    return User.findOne({email});
}

/**
 * Save a new user to the database.
 * @param {Object} user
 * @returns {Promise<void>}
 */
async function saveUser(user) {
    try {
        await User.create(user);
    } catch (error) {
        console.error(`Error saving user: ${error}`);
        throw new Error('Could not save user');
    }
}

/**
 * Update user details.
 * @param {string} userId
 * @param {Object} updateData
 * @returns {Promise<void>}
 */
async function updateUser(userId, updateData) {
    try {
        await User.findOneAndUpdate({ id: userId }, updateData, { new: true });
    } catch (error) {
        console.error(`Error updating user: ${error}`);
        throw new Error('Could not update user');
    }
}

/**
 * Check if a user exists by email.
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function existsUserWithEmail(email) {
    const user = await findUserByEmail(email);
    return !!user;
}

/**
 * Delete a user by ID.
 * @param {string} userId
 * @returns {Promise<boolean>}
 */
async function deleteUserById(userId) {
    const result = await User.deleteOne({ id: userId });
    return result.deletedCount === 1;
}

/**
 * Get all users with pagination.
 * @param {number} limit
 * @param {number} skip
 * @returns {Promise<Array<Object>>}
 */
async function getAllUsers(limit, skip) {
    return User.find({}, {password: 0, __v: 0, _id: 0})
        .sort({name: 1}) // Optional: sort by name alphabetically
        .skip(skip)
        .limit(limit);
}



module.exports = {
    findUserByEmail,
    saveUser,
    updateUser,
    existsUserWithEmail,
    deleteUserById,
    getAllUsers,
};
