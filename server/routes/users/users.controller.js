const {
    getAllUsers, saveUser, updateUserById, deleteUserById, findUserById,
} = require("../../models/users/users.model");
const {getPagination} = require("../../services/query");

async function httpGetAllUsers(req, res) {
    const {limit, skip} = getPagination(req.query);
    const users = await getAllUsers(limit, skip);
    return res.status(200).json(users);
}

async function httpAddUser(req, res) {
    const user = req.body;
    if (!user.name || !user.email || !user.password) {
        return res.status(400).json({
            error: "Some missing properties are required",
        });
    }

    try {
        const savedUser = await saveUser(user);
        return res.status(201).json(savedUser);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to save user",
        });
    }
}

async function httpUpdateUser(req, res) {
    const userId = req.params.id;
    const updateData = req.body;

    try {
        const updatedUser = await updateUserById(userId, updateData);
        if (!updatedUser) {
            return res.status(404).json({
                error: `User with id ${userId} not found`,
            });
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({
            error: "Failed to update user",
        });
    }
}

async function httpDeleteUser(req, res) {
    const userId = req.params.id;

    try {
        const deleted = await deleteUserById(userId);
        if (!deleted) {
            return res.status(404).json({
                error: `User with id ${userId} not found`,
            });
        }
        return res.status(200).json({
            ok: true,
        });
    } catch (err) {
        return res.status(500).json({
            error: "Failed to delete user",
        });
    }
}

module.exports = {
    httpGetAllUsers, httpAddUser, httpUpdateUser, httpDeleteUser,
};
