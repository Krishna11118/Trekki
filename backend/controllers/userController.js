import User from "../models/User.js";

// Create New user
export const createUser = async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully Created",
      data: savedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create,Try again" });
  }
};

//update user

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};
//get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  try {
    const User = await User.findById(id);

    res.status(200).json({
      success: true,
      message: "Successful",
      data: User,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not  found",
    });
  }
};
//get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      success: true, 

      message: "Successful",
      data: user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "not  found",
    });
  }
};
